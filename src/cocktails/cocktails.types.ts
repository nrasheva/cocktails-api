export type Ingredient = {
  name: string;
  quantity: string;
};

export type RecipeStep = {
  stepNumber: string;
  instruction: string;
};

export type Cocktail = {
  name: string;
  description: string;
  img: string;
  ingredients: Ingredient[];
  recipe: RecipeStep[];
  taste: string;
  time: string;
  level: string;
};
