/* import axios from "axios"; */
import { PAGINATE } from "./types";

export function section(direction) {
   return async function (dispatch) {
      try {
         dispatch({
            type: PAGINATE,
            payload: direction,
         });
      } catch (error) {
         console.log(error);
      }
   };
}
