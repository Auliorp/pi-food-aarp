import { SET_PAGE, NEXT_PAGE, PREVIOUS_PAGE } from "./type";

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
