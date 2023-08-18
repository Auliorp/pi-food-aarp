import axios from "axios";

export const getDiets = async (diets) => {
   let result;
   try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}diets`);
      result = response.data;
   } catch (error) {
      console.log(error);
   }
   return result;
};
