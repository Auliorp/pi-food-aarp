import axios from "axios";

export const getRecipes = async (name) => {
   let result;
   try {
      const params = {};

      if (name) {
         params.name = name;
      }

      const response = await axios.get(`http://localhost:3001/recipes`, params);
      result = response.data;

      /*  result = [
         {
            id: 782585,
            name: "Cannellini Bean and Asparagus Salad with Mushrooms",
            image: "https://spoonacular.com/recipeImages/782585-312x231.jpg",
            diets: [
               "gluten free",
               "dairy free",
               "lacto ovo vegetarian",
               "vegan",
            ],
            healthScore: 100,
         },
         {
            id: 716426,
            name: "Cauliflower, Brown Rice, and Vegetable Fried Rice",
            image: "https://spoonacular.com/recipeImages/716426-312x231.jpg",
            diets: [
               "gluten free",
               "dairy free",
               "lacto ovo vegetarian",
               "vegan",
            ],
            healthScore: 75,
         },
         {
            id: 715497,
            name: "Berry Banana Breakfast Smoothie",
            image: "https://spoonacular.com/recipeImages/715497-312x231.jpg",
            diets: ["lacto ovo vegetarian"],
            healthScore: 64,
         },
         {
            id: 715415,
            name: "Red Lentil Soup with Chicken and Turnips",
            image: "https://spoonacular.com/recipeImages/715415-312x231.jpg",
            diets: ["gluten free", "dairy free"],
            healthScore: 100,
         },
         {
            id: 716406,
            name: "Asparagus and Pea Soup: Real Convenience Food",
            image: "https://spoonacular.com/recipeImages/716406-312x231.jpg",
            diets: [
               "gluten free",
               "dairy free",
               "paleolithic",
               "lacto ovo vegetarian",
               "primal",
               "vegan",
            ],
            healthScore: 100,
         },
      ]; */
   } catch (error) {
      console.log(error);
   }
   return result;
};

export const getRecipesById = async (id) => {
   let result;
   try {
      const response = await axios.get(`http://localhost:3001/recipe/${id}`);
      result = response.data;
   } catch (error) {
      console.log(error);
   }
   return result;
};
