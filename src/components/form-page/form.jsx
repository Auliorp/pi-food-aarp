/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./form.css";
import "../../utils/UI/buttons.css";
import { getDiets } from "../../services/diets";
import { postDiets } from "../../services/recipes";
import { useNavigate } from "react-router-dom";

let FormRecipe = () => {
   const [formData, setFormData] = useState({
      name: "",
      description: "",
      healthScore: "",
      steps: "",
      image: "",
      diets: [],
   });

   const [dietsData, setDietsData] = useState([]);
   useEffect(() => {
      fetchDiets();
   }, []);

   const fetchDiets = async () => {
      const response = await getDiets();

      setDietsData(response);
   };

   const [error, setError] = useState({
      name: "required field.",
      healthScore: "required field.",
      steps: "required field.",
      diets: "required field.",
   });

   const handleSubmit = async (event) => {
      event.preventDefault();
      const form = document.getElementById("form");
      try {
         // Llama a la función de servicio para enviar los datos a la db
         const response = await postDiets(formData);

         window.alert("Recipe created successfully");

         // Limpia el formulario
         setFormData({
            name: "",
            description: "",
            healthScore: "",
            steps: "",
            image: "",
            diets: [],
         });
         form.reset();
         setError({
            name: "required field.",
            healthScore: "required field.",
            steps: "required field.",
            diets: "required field.",
         });
      } catch (error) {
         console.error("Error al crear la receta:", error);
      }
   };

   const handleMultiSelectChange = (event) => {
      const selectedOption = event.target.value;
      //dietas actualizadas
      let updatedDiets;

      if (formData.diets.includes(selectedOption)) {
         updatedDiets = formData.diets.filter(
            (diet) => diet !== selectedOption
         );
      } else {
         updatedDiets = [...formData.diets, selectedOption];
      }

      setFormData({
         ...formData,
         diets: updatedDiets,
      });

      validate(
         {
            ...formData,
            diets: updatedDiets,
         },
         "diets"
      );
   };

   const handleChipRemove = (dietId) => {
      const updatedDiets = formData.diets.filter((diet) => diet !== dietId);

      setFormData({
         ...formData,
         diets: updatedDiets,
      });

      validate(
         {
            ...formData,
            diets: updatedDiets,
         },
         "diets"
      );
   };

   const handleChange = (event) => {
      setFormData({
         ...formData,
         [event.target.name]: event.target.value,
      });

      validate(
         {
            ...formData,
            [event.target.name]: event.target.value,
         },
         event.target.name
      );
   };
   //Desactivar
   const disable = () => {
      let disabled = true;
      for (let err in error) {
         if (error[err] === "") disabled = false;
         else {
            disabled = true;
            break;
         }
      }
      return disabled;
   };
   const validate = (formData, name) => {
      const spaceRegex = /^\s*$/;
      const letterRegex = /^[a-zA-Z\s]+$/;

      if (name === "name") {
         if (formData.name === "") {
            setError({ ...error, name: "required field." });
         } else if (spaceRegex.test(formData.name)) {
            setError({
               ...error,
               name: "Cannot have empty spaces.",
            });
         } else if (!letterRegex.test(formData.name)) {
            setError({ ...error, name: "only letters are allowed" });
         } else {
            setError({ ...error, name: "" });
         }
      }

      if (name === "healthScore") {
         if (formData.healthScore === "") {
            setError({ ...error, healthScore: "required field." });
         } else if (spaceRegex.test(formData.healthScore)) {
            setError({
               ...error,
               healthScore: "Cannot have empty spaces.",
            });
         } else if (isNaN(formData.healthScore)) {
            setError({ ...error, healthScore: "only numbers are allowed." });
         } else {
            const healthScoreNumber = parseInt(formData.healthScore);
            if (healthScoreNumber < 1 || healthScoreNumber > 100) {
               setError({
                  ...error,
                  healthScore: "Must be a number between 1 and 100.",
               });
            } else {
               setError({ ...error, healthScore: "" });
            }
         }
      }
      if (name === "steps") {
         if (formData.steps === "") {
            setError({ ...error, steps: "required field." });
         } else if (spaceRegex.test(formData.steps)) {
            setError({
               ...error,
               steps: "Cannot have empty spaces.",
            });
         } else {
            setError({ ...error, steps: "" });
         }
      }

      if (name === "diets") {
         if (formData.diets.length > 0) {
            setError({ ...error, diets: "" });
         } else {
            setError({
               ...error,
               diets: "You must select at least one diet.",
            });
         }
      }
   };
   const navigate = useNavigate();
   const redirectHome = () => {
      navigate("/home");
   };
   return (
      <>
         <div className="form-close">
            <button onClick={redirectHome} className="button-warning">
               X
            </button>
         </div>
         <div className="form-all">
            <form id="form" onSubmit={handleSubmit}>
               <h2>Form:</h2>
               <label htmlFor="name">Name:</label>
               <input
                  type="text"
                  name="name"
                  placeholder="Enter your name here"
                  onChange={handleChange}
               />
               <label className="form-error">{error.name}</label>
               <br />

               <label htmlFor="description">Description:</label>
               <input
                  type="text"
                  name="description"
                  placeholder="Enter your description here"
                  onChange={handleChange}
               />
               <br />

               <label htmlFor="healthScore">HealthScore:</label>
               <input
                  type="text"
                  name="healthScore"
                  placeholder="Enter your health score here"
                  onChange={handleChange}
               />
               <label className="form-error">{error.healthScore}</label>
               <br />

               <label htmlFor="steps">Steps:</label>
               <input
                  type="textarea"
                  name="steps"
                  placeholder="Enter the step by step here"
                  onChange={handleChange}
               />
               <label className="form-error">{error.steps}</label>
               <br />

               <label htmlFor="image">Image:</label>
               <input
                  type="text"
                  name="image"
                  placeholder="Enter your image here"
                  onChange={handleChange}
               />
               <br />

               <label htmlFor="diets">Diets:</label>
               <select
                  name="diets"
                  /* value={formData.diets} */
                  onChange={handleMultiSelectChange}
               >
                  <option value="">Select a diet</option>
                  {dietsData?.map((diet) => (
                     <option key={diet.nombre} value={diet.nombre}>
                        {diet.nombre}
                     </option>
                  ))}
               </select>
               <label className="form-error"> {error.diets}</label>

               <div>
                  selected diets:
                  {formData.diets.map((dietId) => {
                     const selectedDiet = dietsData.find(
                        (diet) => diet.nombre === dietId
                     );
                     return (
                        <div key={dietId} className="chip">
                           {selectedDiet
                              ? selectedDiet.nombre
                              : "unknown diet name"}
                           <button onClick={() => handleChipRemove(dietId)}>
                              X
                           </button>
                        </div>
                     );
                  })}
               </div>

               <br />
               <input
                  className="button-primary"
                  disabled={disable()}
                  type="submit"
                  value="Send Recipe"
               />
            </form>
         </div>
      </>
   );
};

export default FormRecipe;
