import axios from "axios";

export const getRecipes = async (type) => {
   let result;
   try {
      const params = {};

      if (type) {
         params.type = type;
      }

      const response = await axios.get(`http://localhost:3001/recipes`, {
         params,
      });

      result = response.data;
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

export const postDiets = async (recipe) => {
   let result;
   try {
      const response = await axios.post(`http://localhost:3001/recipe`, recipe);
      result = response.data;
   } catch (error) {
      console.log(error);
   }
   return result;
};

export const getAllRecipes = async () => {
   let result;
   try {
      const response = await axios.get(`http://localhost:3001/allRecipes`);
      result = response.data;
   } catch (error) {
      console.log(error);
   }
   return result;
};
