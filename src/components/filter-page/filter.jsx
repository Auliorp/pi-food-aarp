import React, { useEffect, useState } from "react";
import { getRecipes } from "../../services/recipes";
import { getDiets } from "../../services/diets";
import { useDispatch, useSelector } from "react-redux";
import {
   setDataType,
   setSelectedDiet,
   setSortBy,
   setSortOrder,
   setRecipes,
   pageOne,
} from "../Redux/Actions/actions";

export const Filter = () => {
   const [dietsData, setDietsData] = useState([]);

   const { dataType, selectedDiet, sortBy, sortOrder } = useSelector(
      (state) => state.filtersAndRecipes.filter
   );

   const dispatch = useDispatch();

   //ordenar por tipo
   const handleSortByChange = (type) => {
      if (type === "diets") {
         dispatch(setDataType(selectedDiet === type ? "" : type));
         dispatch(pageOne());
      } else {
         dispatch(setSortBy(type));
         dispatch(pageOne());
      }
   };

   const handleSortOrderChange = () => {
      dispatch(setSortOrder(sortOrder === "asc" ? "desc" : "asc"));
      dispatch(pageOne());
   };

   const fetchDiets = async () => {
      const response = await getDiets();

      setDietsData(response);
   };

   useEffect(() => {
      const fetchRecipes = async () => {
         const response = await getRecipes(dataType);

         dispatch(setRecipes(response));
         dispatch(pageOne());
      };
      fetchRecipes();
   }, [dataType, dispatch]);

   useEffect(() => {
      fetchDiets();
   }, []);

   return (
      <>
         {/* tipos de data */}
         <select
            value={dataType}
            onChange={(event) => {
               dispatch(setDataType(event.target.value));
               dispatch(pageOne());
            }}
            className={sortBy === "data" ? "button-warning" : "button-primary"}
         >
            <option value="all">All Recipes</option>
            <option value="api">Api</option>
            <option value="db">Db</option>
         </select>

         {/* tipo de dietas */}
         <select
            value={selectedDiet}
            onChange={(event) => {
               dispatch(setSelectedDiet(event.target.value));
               dispatch(pageOne());
            }}
            className={
               sortBy === "healthScore" ? "button-warning" : "button-primary"
            }
         >
            <option value="">All diets</option>
            {dietsData?.map((diet) => (
               <option key={diet.nombre} value={diet.nombre}>
                  {diet.nombre}
               </option>
            ))}
         </select>

         {/* por nombre */}
         <div className="sort-options">
            <button
               onClick={() => handleSortByChange("name")}
               className={
                  sortBy === "name" ? "button-warning" : "button-primary"
               }
            >
               Sort by Name
            </button>

            {/* por health score */}
            <button
               onClick={() => handleSortByChange("healthScore")}
               className={
                  sortBy === "healthScore" ? "button-warning" : "button-primary"
               }
            >
               Sort by Health Score
            </button>

            {/* asc/desc */}
            <button onClick={handleSortOrderChange} className="clean-button">
               {sortOrder === "asc" ? "Asc" : "Desc"}
            </button>
         </div>
      </>
   );
};
