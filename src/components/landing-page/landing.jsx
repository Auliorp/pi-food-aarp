import React from "react";
import { useNavigate } from "react-router-dom";

import "./landing.css";

const Landing = () => {
   const navigate = useNavigate();

   const redirectHome = () => {
      navigate("/home");
   };

   return (
      <>
         {/* <img src="" className="logo" alt="logo" /> */}
         <button onClick={redirectHome}>HOME</button>
      </>
   );
};

export default Landing;
