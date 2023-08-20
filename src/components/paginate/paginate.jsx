import React from "react";
import { useDispatch } from "react-redux";
import { nextPage, previousPage } from "../Redux/Actions/actions";

const Paginate = (props) => {
   const { page, disableNext } = props;
   const dispatch = useDispatch();

   const handlerNextPage = () => {
      dispatch(nextPage());
   };

   const handlerPrevPage = () => {
      dispatch(previousPage());
   };

   return (
      <div className="pagination">
         <button
            onClick={handlerPrevPage}
            disabled={page === 1}
            className="button-primary"
         >
            Prev
         </button>
         <span>{page} - 4</span>
         <button
            onClick={handlerNextPage}
            disabled={disableNext}
            className="button-primary"
         >
            Next
         </button>
      </div>
   );
};

export default Paginate;
