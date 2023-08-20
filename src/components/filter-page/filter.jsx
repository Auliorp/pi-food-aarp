import React, { useCallback, useEffect, useState } from "react";
import { getRecipes } from "../../services/recipes";
import { getDiets } from "../../services/diets";
import { useDispatch, useSelector } from "react-redux";
import {
   setDataType,
   setSelectedDiet,
   setSortBy,
   setSortOrder,
   setRecipes,
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
      } else {
         dispatch(setSortBy(type));
      }
   };

   //ordenar por clasificacion
   const handleSortOrderChange = () => {
      dispatch(setSortOrder(sortOrder === "asc" ? "desc" : "asc"));
   };

   const fetchRecipes = useCallback(async (type) => {
      const response = await getRecipes(type);

      dispatch(setRecipes(response));
   }, []);

   const fetchDiets = async () => {
      const response = await getDiets();

      setDietsData(response);
   };

   useEffect(() => {
      fetchRecipes(dataType);
   }, [dataType, fetchRecipes]);

   useEffect(() => {
      fetchDiets();
   }, []);

   return (
      <>
         <select
            value={dataType}
            onChange={(event) => dispatch(setDataType(event.target.value))}
            className={sortBy === "data" ? "button-warning" : "button-primary"}
         >
            <option value="all">All Recipes</option>
            <option value="api">Api</option>
            <option value="db">Db</option>
         </select>

         <select
            value={selectedDiet}
            onChange={(event) => dispatch(setSelectedDiet(event.target.value))}
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
                  sortBy === "healthScore" ? "button-warning" : "button-primary"
               }
            >
               Sort by Health Score
            </button>
            <button onClick={handleSortOrderChange} className="clean-button">
               {sortOrder === "asc" ? "Asc" : "Desc"}
            </button>
         </div>
      </>
   );
};
