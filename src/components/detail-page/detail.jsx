/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { getRecipesById } from "../../services/recipes";
import { useParams, useNavigate } from "react-router-dom";
import "./detail.css";
import "../../utils/UI/buttons.css";

const Detail = (props) => {
   const [recipe, setRecipe] = useState(null);
   const { id } = useParams();
   const navigate = useNavigate();

   const deleteRegex = /<\/?[a-z][\s\S]*?>/gi;

   useEffect(() => {
      fetchRecipeById();
   }, []);

   //buscar receta por ID
   const fetchRecipeById = async () => {
      try {
         const response = await getRecipesById(id);
         setRecipe(response);
      } catch (error) {
         console.error(error);
      }
   };

   const redirectHome = () => {
      navigate("/home");
   };

   return recipe ? (
      <div className="detail-new">
         <div className="detail-close">
            <button onClick={redirectHome} className="button-warning">
               X
            </button>
         </div>
         <h3 className="detail-id">Id: {recipe?.id}.</h3>
         <br />

         <h3 className="detail-name">Name: {recipe?.name}.</h3>
         <br />
         <h3>Description:</h3>
         <label className="detail-description">
            {recipe?.description.replace(deleteRegex, "")}
         </label>
         <br />
         <h3 className="detail-healthScore">
            Health Score: {recipe?.healthScore}
         </h3>
         <br />
         <h3>Steps:</h3>
         <label className="detail-steps">
            {recipe.steps?.length > 0 &&
               recipe.steps.map((step, index) => (
                  <ul key={index}>
                     <li>{step}</li>
                  </ul>
               ))}
         </label>
         <div className="image-detail-container">
            <img
               className="image-detail"
               src={recipe?.image}
               alt={`Receta ${recipe.name}.`}
               width={200}
               height={200}
            />
         </div>
         <h3>Diets:</h3>
         <label className="detail-diets">
            {recipe.diets?.length > 0 &&
               recipe.diets.map((diet, index) => (
                  <ul className="diet" key={index}>
                     <li>{diet}</li>
                  </ul>
               ))}
         </label>
      </div>
   ) : (
      ""
   );
};

export default Detail;
