import { combineReducers } from "redux";
import {
   NEXT_PAGE,
   PAGE_ONE,
   PREVIOUS_PAGE,
   SELECTED_DIET,
   SET_DATATYPE,
   SET_PAGE,
   SET_RECIPES,
   SORT_BY,
   SORT_ORDER,
} from "../Actions/type";

const initialState = {
   currentPage: 1,
};

const initialFilterAndRecipesState = {
   filter: {
      dataType: "all",
      selectedDiet: "",
      sortBy: "name",
      sortOrder: "asc",
      currentPage: 1,
   },
   recipes: [],
};

export const paginatorReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_PAGE:
         return {
            ...state,
            currentPage: action.payload,
         };
      case PREVIOUS_PAGE:
         return {
            ...state,
            currentPage: state.currentPage - 1,
         };

      case NEXT_PAGE:
         return {
            ...state,
            currentPage: state.currentPage + 1,
         };

      case PAGE_ONE:
         return { ...state, currentPage: 1 };

      default:
         return state;
   }
};

export const filterAndRecipesReducer = (
   state = initialFilterAndRecipesState,
   action
) => {
   switch (action.type) {
      case SET_DATATYPE:
         return {
            ...state,
            filter: {
               ...state.filter,
               dataType: action.payload,
            },
         };

      case SELECTED_DIET:
         return {
            ...state,
            filter: {
               ...state.filter,
               selectedDiet: action.payload,
            },
         };

      case SORT_BY:
         return {
            ...state,
            filter: {
               ...state.filter,
               sortBy: action.payload,
            },
         };

      case SORT_ORDER:
         return {
            ...state,
            filter: {
               ...state.filter,
               sortOrder: action.payload,
            },
         };

      case SET_RECIPES:
         return {
            ...state,
            recipes: action.payload,
         };

      default:
         return state;
   }
};

const rootReducer = combineReducers({
   filtersAndRecipes: filterAndRecipesReducer,
   paginator: paginatorReducer,
});

export default rootReducer;
