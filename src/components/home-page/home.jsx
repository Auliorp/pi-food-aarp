import React, { useEffect, useState } from "react";
import { getRecipes } from "../../services/recipes";
import RecipesContainer from "../recipe/RecipesContainer";
import "./home.css";
import { section } from "../redux/actions/actions";
import { useDispatch } from "react-redux";

const Home = () => {
   const [recipes, setRecipes] = useState([]);
   const dispatch = useDispatch();

   useEffect(() => {
      fetchRecipes();
   }, []);

   const fetchRecipes = async () => {
      const response = await getRecipes();
      console.log(response);
      setRecipes(response);
   };

   const paginated = (event) => {
      dispatch(section(event.target.name));
   };
   return (
      <div>
         <div>
            <RecipesContainer recipes={recipes} />
         </div>
         <div>
            <button name="prev" onClick={paginated}>
               Prev
            </button>
            <button name="next" onClick={paginated}>
               Next
            </button>
         </div>
      </div>
   );
};

export default Home;
