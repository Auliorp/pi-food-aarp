import {
   SET_PAGE,
   NEXT_PAGE,
   PREVIOUS_PAGE,
   SET_DATATYPE,
   SELECTED_DIET,
   SORT_BY,
   SORT_ORDER,
   SET_RECIPES,
   PAGE_ONE,
} from "./type";

export const setPage = (pageNumber) => ({
   type: SET_PAGE,
   payload: pageNumber,
});

export const nextPage = () => ({
   type: NEXT_PAGE,
   payload: null,
});

export const previousPage = () => ({
   type: PREVIOUS_PAGE,
   payload: null,
});

export const pageOne = () => ({
   type: PAGE_ONE,
   payload: null,
});

export const setDataType = (payload) => ({
   type: SET_DATATYPE,
   payload,
});

export const setSelectedDiet = (payload) => ({
   type: SELECTED_DIET,
   payload,
});

export const setSortBy = (payload) => ({
   type: SORT_BY,
   payload,
});

export const setSortOrder = (payload) => ({
   type: SORT_ORDER,
   payload,
});

export const setRecipes = (payload) => ({
   type: SET_RECIPES,
   payload,
});
