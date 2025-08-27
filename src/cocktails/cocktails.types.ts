export type Ingredient = {
  name: string;
  measeure?: string;
};

// export type RecipeStep = {
//   stepNumber: string;
//   instruction: string;
// };

export type Cocktail = {
  idDrink: string;
  name: string;
  category: string;
  alcoholic: string;
  glass: string;
  instructions: string;
  img: string;
  thumb: string;
  ingredients: Ingredient[];
  // recipe: RecipeStep[];
  // taste: string;
  // time: string;
  // level: string;
};
