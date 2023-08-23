import React, { useState } from "react";
import Recipe from "./Recipe";
import "./recipesContainer.css";
import "../../utils/UI/buttons.css";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Paginate from "../paginate/paginate";
import { Filter } from "../filter-page/filter";

function RecipesContainer() {
   //estado local campo de busqueda
   const [searchQuery, setSearchQuery] = useState("");

   //Se utiliza el hook useSelector para seleccionar datos del estado global almacenados en Redux(reducer).
   const {
      recipes,
      filter: { selectedDiet, sortBy, sortOrder },
   } = useSelector((state) => state.filtersAndRecipes);

   //pagina actual
   const currentPage = useSelector((state) => state.paginator.currentPage);

   //se llama la funcion cuando el valor del campo cambia y se actualiza en searchQuery mediante setSearchQuery
   const handleSearchInputChange = (event) => {
      setSearchQuery(event.target.value);
   };

   //filtro y orden de recetas
   const filteredAndSortedRecipes = recipes
      ?.filter(
         //verifica si el nombre de la receta contiene el valor de busqueda.
         //verifica si la dieta seleccionada es la cadena vacía (lo que significa
         //que no se ha seleccionado una dieta) o si la receta contiene la dieta seleccionada.
         (recipe) =>
            recipe.name?.toLowerCase().includes(searchQuery?.toLowerCase()) &&
            (selectedDiet === "" || recipe.diets.includes(selectedDiet))
      )
      .sort((a, b) => {
         //se ordenan por nombre o healthScore
         const aValue = sortBy === "name" ? a.name : a.healthScore;
         const bValue = sortBy === "name" ? b.name : b.healthScore;

         if (sortBy === "name") {
            //orden de manera alfabetica (asc o desc)
            return sortOrder === "asc"
               ? aValue.localeCompare(bValue)
               : bValue.localeCompare(aValue);
         } else {
            //ordena de manera numerica (asc o desc)
            return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
         }
      });

   //recetas que se renderizaran por pagina
   const recipesPerPage = 9;

   //numero total de paginas dependiendo la data
   const totalRecipes = filteredAndSortedRecipes?.length;
   const totalPages = Math.ceil(totalRecipes / recipesPerPage);

   //indice de la primera y ultima receta renderizada en paginado
   const indexOfLastRecipe = currentPage * recipesPerPage;
   const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;

   //obtiene una porción de recetas que deben mostrarse en la página actual.
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
                  totalPages={totalPages}
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
