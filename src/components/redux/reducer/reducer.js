import { GET_RECIPE, PAGINATE } from "../actions/types";

let inicialState = {
   allRecipes: [],
   allRecipesBackUp: [],
   currentPage: 0,
};

function reducer(state = inicialState, action) {
   const numberPageRecipe = 9;
   switch (action.type) {
      case GET_RECIPE:
         return {
            ...state,
            allRecipes: [...action.payload].splice(0, numberPageRecipe),
            allRecipesBackUp: action.payload,
         };

      case PAGINATE:
         const next_page = state.currentPage + 1;
         const prev_page = state.currentPage - 1;
         const firstIndex =
            action.payload === "next"
               ? next_page * numberPageRecipe
               : prev_page * numberPageRecipe;
         /* if (
            action.payload === "next" &&
            firstIndex >= state.allRecipes.length
         ) {
            return { ...state };
         } else if (action.payload === "prev" && prev_page < 0) {
            return { ...state };
         } */
         return {
            ...state,
            allRecipes: [...state.allRecipesBackUp].splice(
               firstIndex,
               numberPageRecipe
            ),
            currentPage: action.payload === "next" ? next_page : prev_page,
         };
      default:
         return state;
   }
}

export default reducer;
