import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import "./recipesContainer.css";
import "../../utils/UI/buttons.css";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Paginate from "../paginate/paginate";
import { Filter } from "../filter-page/filter";

function RecipesContainer() {
   const [searchQuery, setSearchQuery] = useState("");

   const {
      recipes,
      filter: { selectedDiet, sortBy, sortOrder },
   } = useSelector((state) => state.filtersAndRecipes);

   const currentPage = useSelector((state) => state.paginator.currentPage);
   const recipesPerPage = 2;

   const handleSearchInputChange = (event) => {
      setSearchQuery(event.target.value);
   };

   //filtro y orden de recetas
   const filteredAndSortedRecipes = recipes
      ?.filter(
         (recipe) =>
            recipe.name?.toLowerCase().includes(searchQuery?.toLowerCase()) &&
            (selectedDiet === "" || recipe.diets.includes(selectedDiet))
      )
      .sort((a, b) => {
         const aValue = sortBy === "name" ? a.name : a.healthScore;
         const bValue = sortBy === "name" ? b.name : b.healthScore;

         if (sortBy === "name") {
            return sortOrder === "asc"
               ? aValue.localeCompare(bValue)
               : bValue.localeCompare(aValue);
         } else {
            return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
         }
      });

   const indexOfLastRecipe = currentPage * recipesPerPage;
   const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
   const currentRecipes = filteredAndSortedRecipes?.slice(
      indexOfFirstRecipe,
      indexOfLastRecipe
   );

   return (
      <>
         <header className="headertop">
            <div className="recipes-button-container">
               {/* Search Bar */}
               <div className="search-bar">
                  <input
                     type="text"
                     placeholder="Search recipes..."
                     value={searchQuery}
                     onChange={handleSearchInputChange}
                  />
               </div>

               {/*  landing page */}
               <div>
                  <Link to={"/"}>
                     <button className="button-primary">Landing</button>
                  </Link>
               </div>
               {/* filtros */}
               <Filter />
               {/* paginado */}
               <Paginate
                  page={currentPage}
                  disableNext={
                     indexOfLastRecipe >= filteredAndSortedRecipes?.length
                  }
               />

               {/* formulario */}
               <div className="form-button">
                  <Link to={"/form"}>
                     <button className="button-primary">Form</button>
                  </Link>
               </div>
            </div>
         </header>

         <div className="recipes-container">
            {/*  recetas filtradas y ordenadas */}
            {currentRecipes?.length > 0 ? (
               currentRecipes.map((recipe, index) => (
                  <Recipe key={index} recipe={recipe} />
               ))
            ) : (
               <div className="error-message">
                  <h4>No matching recipes found.</h4>
               </div>
            )}
         </div>
      </>
   );
}

export default RecipesContainer;
