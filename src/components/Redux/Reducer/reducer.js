import { combineReducers } from "redux";
import { NEXT_PAGE, PREVIOUS_PAGE, SET_PAGE } from "../Actions/type";

const initialState = {
   currentPage: 1,
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
      default:
         return state;
   }
};

const rootReducer = combineReducers({
   paginator: paginatorReducer,
});

export default rootReducer;
