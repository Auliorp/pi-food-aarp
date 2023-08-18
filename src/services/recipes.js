import axios from "axios";

export const getRecipes = async (type) => {
   let result;
   try {
      const params = {};

      if (type) {
         params.type = type;
      }

      const response = await axios.get(
         `${process.env.REACT_APP_API_URL}recipes`,
         {
            params,
         }
      );

      result = response.data;
   } catch (error) {
      console.log(error);
   }
   return result;
};

export const getRecipesById = async (id) => {
   let result;
   try {
      const response = await axios.get(
         `${process.env.REACT_APP_API_URL}recipe/${id}`
      );
      result = response.data;
   } catch (error) {
      console.log(error);
   }
   return result;
};

export const postDiets = async (recipe) => {
   let result;
   try {
      const response = await axios.post(
         `${process.env.REACT_APP_API_URL}recipe`,
         recipe
      );
      result = response.data;
   } catch (error) {
      console.log(error);
   }
   return result;
};

export const getAllRecipes = async () => {
   let result;
   try {
      const response = await axios.get(
         `${process.env.REACT_APP_API_URL}allRecipes`
      );
      result = response.data;
   } catch (error) {
      console.log(error);
   }
   return result;
};
