import React, { useEffect, useState } from "react";
import { getAllRecipes, getRecipes } from "../../services/recipes";
import RecipesContainer from "../recipe/RecipesContainer";
import "./home.css";

const Home = () => {
   const [recipes, setRecipes] = useState([]);

   useEffect(() => {
      fetchRecipes();
   }, []);

   const fetchRecipes = async () => {
      const response = await getRecipes();
      const responseTwo = await getAllRecipes();
      const responseTotal = response.concat(responseTwo);

      setRecipes(responseTotal);
   };

   return (
      <div>
         <RecipesContainer recipes={recipes} />
      </div>
   );
};

export default Home;
