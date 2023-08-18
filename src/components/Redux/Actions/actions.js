import { SET_PAGE } from "./type";

export const setPage = (pageNumber) => ({
   type: SET_PAGE,
   payload: pageNumber,
});
