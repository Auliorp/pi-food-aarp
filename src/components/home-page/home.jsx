import React, { useEffect, useState } from "react";
import { getRecipes } from "../../services/recipes";
import RecipesContainer from "../recipe/RecipesContainer";
import "./home.css";

const Home = () => {
   const [recipes, setRecipes] = useState([]);

   useEffect(() => {
      fetchRecipes();
   }, []);

   const fetchRecipes = async () => {
      const response = await getRecipes();

      setRecipes(response);
   };

   return (
      <div>
         <RecipesContainer recipes={recipes} />
      </div>
   );
};

export default Home;
