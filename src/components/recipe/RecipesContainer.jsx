import React, { useState } from "react";
import Recipe from "./Recipe";
import "./recipesContainer.css";
import "../../utils/UI/buttons.css";

import { Link } from "react-router-dom";

function RecipesContainer({ recipes }) {
   const [searchQuery, setSearchQuery] = useState("");
   const [sortOrder, setSortOrder] = useState("asc");
   const [sortBy, setSortBy] = useState("name");
   const [currentPage, setCurrentPage] = useState(1);
   const recipesPerPage = 9;

   const handleSearchInputChange = (event) => {
      setSearchQuery(event.target.value);
   };

   const handleSortByChange = (type) => {
      setSortBy(type);
   };

   const handleSortOrderChange = () => {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
   };

   const nextPage = () => {
      setCurrentPage(currentPage + 1);
   };

   const prevPage = () => {
      setCurrentPage(currentPage - 1);
   };

   const filteredAndSortedRecipes = recipes
      ?.filter((recipe) =>
         recipe.name?.toLowerCase().includes(searchQuery?.toLowerCase())
      )
      .sort((a, b) => {
         const aValue = sortBy === "name" ? a.name : a.healthScore;
         const bValue = sortBy === "name" ? b.name : b.healthScore;

         if (sortBy === "name") {
            return sortOrder === "asc"
               ? aValue.localeCompare(bValue, undefined, { numeric: true })
               : bValue.localeCompare(aValue, undefined, { numeric: true });
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

               {/* Sorting Options */}
               <div className="sort-options">
                  <button
                     onClick={() => handleSortByChange("name")}
                     className={
                        sortBy === "name" ? "button-warning" : "button-primary"
                     }
                  >
                     Sort by Name
                  </button>
                  <button
                     onClick={() => handleSortByChange("healthScore")}
                     className={
                        sortBy === "healthScore"
                           ? "button-warning"
                           : "button-primary"
                     }
                  >
                     Sort by Health Score
                  </button>
                  <button
                     onClick={handleSortOrderChange}
                     className="clean-button"
                  >
                     {sortOrder === "asc" ? "Asc" : "Desc"}
                  </button>
               </div>

               {/* Pagination */}
               <div className="pagination">
                  <button
                     onClick={prevPage}
                     disabled={currentPage === 1}
                     className="button-primary"
                  >
                     Prev
                  </button>
                  <span>{currentPage}</span>
                  <button
                     onClick={nextPage}
                     disabled={
                        indexOfLastRecipe >= filteredAndSortedRecipes?.length
                     }
                     className="button-primary"
                  >
                     Next
                  </button>
               </div>
               {/* formulary */}
               <div className="form-button">
                  <Link to={"/form"}>
                     <button className="button-primary">Formulario</button>
                  </Link>
               </div>
            </div>
         </header>

         <div className="recipes-container">
            {/* Display filtered and sorted recipes */}
            {currentRecipes.length > 0 ? (
               currentRecipes.map((recipe, index) => (
                  <Recipe key={index} recipe={recipe} />
               ))
            ) : (
               <div>No matching recipes found.</div>
            )}
         </div>
      </>
   );
}

export default RecipesContainer;
