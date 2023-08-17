import { combineReducers } from "redux";
import { SET_PAGE } from "../Actions/actions";

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
      default:
         return state;
   }
};

const rootReducer = combineReducers({
   paginator: paginatorReducer,
});

export default rootReducer;
