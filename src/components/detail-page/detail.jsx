import React, { useEffect, useState } from "react";
import { getRecipesById } from "../../services/recipes";
import { useParams, useNavigate } from "react-router-dom";

const Detail = (props) => {
   const [recipe, setRecipe] = useState(null);
   console.log(recipe);
   const { id } = useParams();

   useEffect(() => {
      fetchRecipeById();
   }, []);

   const fetchRecipeById = async () => {
      const response = await getRecipesById(id);
      /*  console.log(response); */
      setRecipe(response);
   };
   const navigate = useNavigate();
   const redirectHome = () => {
      navigate("/home");
   };
   return recipe ? (
      <div>
         <button onClick={redirectHome}>X</button>
         <h2>{recipe?.id}</h2>
         <h2>{recipe?.name}</h2>
         <h2>{recipe?.description}</h2>
         <h2>{recipe?.healthScore}</h2>
         <h2>{recipe?.steps}</h2>
         <img
            src={recipe?.image}
            alt={`Receta ${recipe.name}.`}
            width={200}
            height={200}
         />
         <h2>{recipe?.diets}</h2>
      </div>
   ) : (
      ""
   );
};

export default Detail;
