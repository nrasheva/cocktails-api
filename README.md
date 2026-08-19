<div align="center">

# 🍸 Cocktails API

**The backend for [cocktails-website](https://github.com/nrasheva/cocktails-website)** — authentication, cocktail
recipes, favorites and shopping lists, served over a REST API and seeded from
[TheCocktailDB](https://www.thecocktaildb.com/).

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)

</div>

---

## 📑 Table of contents

- [Features](#-features)
- [Tech stack](#-tech-stack)
- [Getting started](#-getting-started)
- [Scripts](#-scripts)
- [API reference](#-api-reference)
- [Data model](#-data-model)
- [Project structure](#-project-structure)
- [Related projects](#-related-projects)
- [Feedback](#-feedback)
- [License](#-license)

## ✨ Features

| Feature               | Description                                                                         |
| --------------------- | ----------------------------------------------------------------------------------- |
| 🔐 **Authentication** | Register and log in with email + password, hashed with `bcrypt`                     |
| 🎫 **JWT sessions**   | Short-lived access tokens (15 min) with rotating refresh tokens (7 days)            |
| 👮 **Authorization**  | Role-based guards — `user` and `admin`                                              |
| 🍹 **Recipes**        | Full CRUD on cocktails, with admin-only writes                                      |
| ⭐ **Favorites**      | Save and remove favorite cocktails per user                                         |
| 🛒 **Shopping list**  | Collect ingredients per user and tick them off as purchased                         |
| 🔄 **External sync**  | Seeds and refreshes the catalogue from TheCocktailDB, plus a daily midnight `@Cron` |
| ✅ **Validation**     | Global `ValidationPipe` with `class-validator` DTOs                                 |

## 🛠 Tech stack

- **Runtime** — Node.js
- **Framework** — [NestJS 10](https://nestjs.com/)
- **Language** — TypeScript 5
- **Database** — MongoDB via [Mongoose](https://mongoosejs.com/)
- **Auth** — `@nestjs/jwt`, `bcrypt`
- **Scheduling** — `@nestjs/schedule`
- **HTTP client** — `@nestjs/axios`
- **Testing** — Jest + Supertest
- **Tooling** — ESLint, Prettier

## 🚀 Getting started

### Prerequisites

- **Node.js** 18 or newer
- **MongoDB** running locally on `mongodb://localhost:27017`

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/nrasheva/cocktails-api
cd cocktails-api
```

**2. Install the dependencies**

```bash
npm install
```

**3. Start the server**

```bash
npm run start        # or: npm run start:dev for watch mode
```

The API is now listening on **http://localhost:3000**.

> [!NOTE]
> On the first boot the cocktails collection is empty, so the app fetches the full catalogue from TheCocktailDB before
> it starts serving requests. Give it a moment. After that, a scheduled job refreshes the catalogue every day at
> midnight.

> [!IMPORTANT]
> The MongoDB connection string (`src/app.module.ts`) and the JWT secrets (`src/auth/constants.ts`) are currently
> hard-coded. Move them to environment variables before deploying anywhere public.

## 📜 Scripts

| Command               | What it does                                   |
| --------------------- | ---------------------------------------------- |
| `npm run start`       | Start the server                               |
| `npm run start:dev`   | Start in watch mode                            |
| `npm run start:debug` | Start in watch mode with the debugger attached |
| `npm run build`       | Compile to `dist/`                             |
| `npm run start:prod`  | Run the compiled build                         |
| `npm run test`        | Run the unit tests                             |
| `npm run test:watch`  | Run the unit tests in watch mode               |
| `npm run test:cov`    | Run the unit tests with a coverage report      |
| `npm run test:e2e`    | Run the end-to-end tests                       |
| `npm run lint`        | Lint and auto-fix                              |
| `npm run format`      | Format `src/` and `test/` with Prettier        |

## 📡 API reference

Base URL: `http://localhost:3000`

Protected routes expect a bearer token:

```http
Authorization: Bearer <access_token>
```

### 🔐 Auth

| Method | Endpoint         | Auth   | Description                                             |
| ------ | ---------------- | ------ | ------------------------------------------------------- |
| `POST` | `/auth/register` | —      | Create an account — `{ email, password }` (min 8 chars) |
| `POST` | `/auth/login`    | —      | Log in — returns `access_token` and `refresh_token`     |
| `POST` | `/auth/refresh`  | —      | Rotate tokens — `{ userId, refresh_token }`             |
| `POST` | `/auth/logout`   | Bearer | Invalidate the stored refresh token                     |

<details>
<summary><b>Example — log in</b></summary>

```bash
curl -X POST http://localhost:3000/auth/login \
  -H 'Content-Type: application/json' \
  -d '{ "email": "you@example.com", "password": "supersecret" }'
```

```json
{
  "userId": "665f1c...",
  "access_token": "eyJhbGciOi...",
  "refresh_token": "eyJhbGciOi...",
  "roles": ["user"]
}
```

</details>

### 🍹 Cocktails

| Method   | Endpoint                       | Auth  | Description                                |
| -------- | ------------------------------ | ----- | ------------------------------------------ |
| `GET`    | `/cocktails`                   | —     | List every cocktail                        |
| `GET`    | `/cocktails/details?id=`       | —     | Get one cocktail by its Mongo `_id`        |
| `POST`   | `/cocktails`                   | Admin | Create a cocktail                          |
| `PUT`    | `/cocktails?id=`               | Admin | Update a cocktail                          |
| `DELETE` | `/cocktails?id=`               | Admin | Delete a cocktail                          |
| `GET`    | `/cocktails/search?name=`      | —     | Search TheCocktailDB by name               |
| `GET`    | `/cocktails/external/:idDrink` | —     | Look up a single drink on TheCocktailDB    |
| `POST`   | `/cocktails/sync-external`     | —     | Pull the full catalogue from TheCocktailDB |

### ⭐ Favorites

All favorites routes require a bearer token.

| Method   | Endpoint                 | Description                       |
| -------- | ------------------------ | --------------------------------- |
| `GET`    | `/favorites`             | List the current user's favorites |
| `POST`   | `/favorites/:cocktailId` | Add a cocktail to favorites       |
| `DELETE` | `/favorites/:cocktailId` | Remove a cocktail from favorites  |

### 🛒 Shopping list

All shopping-list routes require a bearer token.

| Method   | Endpoint                                | Description                                  |
| -------- | --------------------------------------- | -------------------------------------------- |
| `GET`    | `/shopping-list`                        | List the current user's shopping list        |
| `POST`   | `/shopping-list`                        | Add an item — `{ cocktailId, ingredientId }` |
| `DELETE` | `/shopping-list/:ingredientName`        | Remove an item                               |
| `PATCH`  | `/shopping-list/:ingredientName/toggle` | Toggle an item between purchased and not     |

## 🗃 Data model

<details>
<summary><b>Cocktail</b></summary>

```ts
{
  idDrink?: string;        // TheCocktailDB id, unique
  name: string;
  category: string;
  alcoholic: string;
  glass: string;
  instructions: string;
  ingredients: { name: string; measure?: string }[];
  img: string;
  thumb: string;
}
```

</details>

<details>
<summary><b>User</b></summary>

```ts
{
  email: string;           // unique
  password: string;        // bcrypt hash
  roles: string[];         // defaults to ['user']
  refreshToken?: string;   // bcrypt hash of the current refresh token
  favorites: ObjectId[];   // → Cocktail
  shoppingList: { ingredientId: string; name: string; purchased: boolean }[];
}
```

</details>

## 📁 Project structure

```
src/
├── auth/              # Register, login, refresh, logout + JWT guards
├── cocktails/         # CRUD, TheCocktailDB sync, daily cron
├── favorites/         # Per-user favorite cocktails
├── shopping-list/     # Per-user ingredient shopping list
├── users/             # User schema and lookups
├── constants/         # Role enum, roles decorator, roles guard
├── app.module.ts      # Root module and Mongo connection
└── main.ts            # Bootstrap, CORS, global validation
```

## 🔗 Related projects

- 🌐 [cocktails-website](https://github.com/nrasheva/cocktails-website) — the frontend that consumes this API
- 🍸 [TheCocktailDB](https://www.thecocktaildb.com/api.php) — the upstream recipe source

## 💬 Feedback

Questions or suggestions? Reach me at
[nadezhda.rasheva96@gmail.com](mailto:nadezhda.rasheva96@gmail.com) — or open an issue.

## 📄 License

Released under the [MIT](https://choosealicense.com/licenses/mit) license.
