import React, { useState } from "react";
import Recipe from "./Recipe";

function RecipesContainer({ recipes }) {
   const [searchQuery, setSearchQuery] = useState("");
   const [sortOrder, setSortOrder] = useState("asc");
   const [sortBy, setSortBy] = useState("name");

   const handleSearchInputChange = (event) => {
      setSearchQuery(event.target.value);
   };

   const handleSortByChange = (type) => {
      setSortBy(type);
   };

   const handleSortOrderChange = () => {
      // Toggle sortOrder between 'asc' and 'desc'
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
   };

   // Filter and sort recipes based on the search query, sortOrder, and sortBy
   const filteredAndSortedRecipes = recipes
      .filter((recipe) =>
         recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
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

   return (
      <div className="recipes-container">
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
               className={sortBy === "name" ? "active" : ""}
            >
               SORTEAR POR NOMBRE
            </button>
            <button
               onClick={() => handleSortByChange("healthScore")}
               className={sortBy === "healthScore" ? "active" : ""}
            >
               SORTEAR POR PUNTOS DE SALUD
            </button>
            <button onClick={handleSortOrderChange}>
               {sortOrder === "asc" ? "Asc" : "Desc"}
            </button>
         </div>

         {/* Display filtered and sorted recipes */}
         {filteredAndSortedRecipes.length > 0 ? (
            filteredAndSortedRecipes.map((recipe, index) => (
               <Recipe key={index} recipe={recipe} />
            ))
         ) : (
            <div>No matching recipes found.</div>
         )}
      </div>
   );
}

export default RecipesContainer;
