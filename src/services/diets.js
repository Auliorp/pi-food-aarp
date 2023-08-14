import axios from "axios";

export const getDiets = async (diets) => {
   let result;
   try {
      const response = await axios.get(`http://localhost:3001/diets`);
      result = response.data;
   } catch (error) {
      console.log(error);
   }
   return result;
};
