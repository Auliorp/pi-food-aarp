import React from "react";
import { useNavigate } from "react-router-dom";
import "./landing.css";

const Landing = () => {
   const navigate = useNavigate();

   const redirectHome = () => {
      navigate("/home");
   };

   return (
      <div className="landing-page">
         <h3>Bienvenido a mi proyecto </h3>

         <button onClick={redirectHome}>HOME</button>
      </div>
   );
};

export default Landing;
