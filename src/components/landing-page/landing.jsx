import React from "react";
import { useNavigate } from "react-router-dom";
import "./landing.css";
import "../../utils/UI/buttons.css";

const Landing = () => {
   const navigate = useNavigate();

   const redirectHome = () => {
      navigate("/home");
   };

   return (
      <div className="landing-page">
         <h2>Bienvenido a mi proyecto </h2>

         <button onClick={redirectHome} className="button-primary">
            HOME
         </button>
      </div>
   );
};

export default Landing;
