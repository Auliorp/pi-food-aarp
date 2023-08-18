import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import "./recipesContainer.css";
import "../../utils/UI/buttons.css";

import { Link } from "react-router-dom";
import { getDiets } from "../../services/diets";
import { getRecipes } from "../../services/recipes";
import { useSelector } from "react-redux";
import Paginate from "../paginate/paginate";

function RecipesContainer() {
   const [searchQuery, setSearchQuery] = useState("");
   const [sortOrder, setSortOrder] = useState("asc");
   const [sortBy, setSortBy] = useState("name");
   const [selectedDiet, setSelectedDiet] = useState("");
   const [dietsData, setDietsData] = useState([]);
   const [dataType, setDataType] = useState("all");
   const [recipes, setRecipes] = useState([]);

   const currentPage = useSelector((state) => state.paginator.currentPage);
   const recipesPerPage = 2;

   useEffect(() => {
      fetchDiets();
   }, []);

   useEffect(() => {
      fetchRecipes(dataType);
   }, [dataType]);

   const fetchRecipes = async (type) => {
      const response = await getRecipes(type);

      setRecipes(response);
   };
   const fetchDiets = async () => {
      const response = await getDiets();

      setDietsData(response);
   };

   const handleSearchInputChange = (event) => {
      setSearchQuery(event.target.value);
   };
   //ordenar por tipo
   const handleSortByChange = (type) => {
      if (type === "diets") {
         setSelectedDiet(selectedDiet === type ? "" : type);
      } else {
         setSortBy(type);
      }
   };
   //ordenar por clasificacion
   const handleSortOrderChange = () => {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
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
               {/* select filtro por data */}

               <select
                  value={dataType}
                  onChange={(event) => setDataType(event.target.value)}
                  className={
                     sortBy === "data" ? "button-warning" : "button-primary"
                  }
               >
                  <option value="all">All Recipes</option>
                  <option value="api">Api</option>
                  <option value="db">Db</option>
               </select>

               {/* select filtro de dietas */}

               <select
                  value={selectedDiet}
                  onChange={(event) => setSelectedDiet(event.target.value)}
                  className={
                     sortBy === "healthScore"
                        ? "button-warning"
                        : "button-primary"
                  }
               >
                  <option value="">All diets</option>
                  {dietsData?.map((diet) => (
                     <option key={diet.nombre} value={diet.nombre}>
                        {diet.nombre}
                     </option>
                  ))}
               </select>

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
                  {/* health score */}
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
