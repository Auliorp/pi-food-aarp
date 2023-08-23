/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./form.css";
import "../../utils/UI/buttons.css";
import { getDiets } from "../../services/diets";
import { postDiets } from "../../services/recipes";
import { useNavigate } from "react-router-dom";

let FormRecipe = () => {
   //estado local para los datos del formulario
   const [formData, setFormData] = useState({
      name: "",
      description: "",
      healthScore: "",
      steps: "",
      image: "",
      diets: [],
   });

   //estado local para las dietas disponibles
   const [dietsData, setDietsData] = useState([]);

   // Efecto para obtener las dietas al montar el componente
   useEffect(() => {
      fetchDiets();
   }, []);

   //solicitud de data
   const fetchDiets = async () => {
      const response = await getDiets();

      setDietsData(response);
   };

   // Estado local para los mensajes de error
   const [error, setError] = useState({
      name: "required field.",
      healthScore: "required field.",
      steps: "required field.",
      diets: "required field.",
   });

   // Función para manejar el envío del formulario
   const handleSubmit = async (event) => {
      //permite manejar el envio a traves de javascript
      event.preventDefault();
      //se obtiene una referencia al elemento del DOM que representa el formulario
      const form = document.getElementById("form");

      try {
         // Llama a la función de servicio para enviar los datos a la db
         const response = await postDiets(formData);

         //se envia alerta "receta creada exitosamente"
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
         //se utiliza para restablecer los valores del formulario a su valor inicial
         form.reset();
         setError({
            name: "required field.",
            healthScore: "required field.",
            steps: "required field.",
            diets: "required field.",
         });
      } catch (error) {
         console.error("Error creating recipe:", error);
      }
   };
   //selecciona dietas en formulario
   const handleMultiSelectChange = (event) => {
      const selectedOption = event.target.value;

      //dietas actualizadas y seleccionadas en el formulario
      let updatedDiets;

      if (formData.diets.includes(selectedOption)) {
         //Si existe, crea una nueva lista de dietas excluyendo la opción seleccionada
         updatedDiets = formData.diets.filter(
            (diet) => diet !== selectedOption
         );

         // Si no existe, agrega la opción seleccionada a la lista de dietas
      } else {
         updatedDiets = [...formData.diets, selectedOption];
      }
      // Actualiza el estado del formulario con las dietas actualizadas
      setFormData({
         ...formData,
         diets: updatedDiets,
      });
      // Llama a la función de validación para actualizar los errores relacionados con las dietas
      validate(
         {
            ...formData,
            diets: updatedDiets,
         },
         "diets"
      );
   };
   /* remover dietas */
   const handleChipRemove = (dietId) => {
      // Filtra la lista de dietas del formulario para excluir la dieta que se va a remover
      const updatedDiets = formData.diets.filter((diet) => diet !== dietId);

      // Actualiza el estado del formulario con las dietas actualizadas
      setFormData({
         ...formData,
         diets: updatedDiets,
      });
      // Llama a la función de validación para actualizar los errores relacionados con las dietas
      validate(
         {
            ...formData,
            diets: updatedDiets,
         },
         "diets"
      );
   };
   // Función para manejar cambios en los campos de entrada del formulario
   const handleChange = (event) => {
      // Actualiza el estado del formulario con el nuevo valor del campo modificado
      setFormData({
         ...formData,
         [event.target.name]: event.target.value,
      });
      // Llama a la función de validación para actualizar los errores relacionados con el campo modificado
      validate(
         {
            ...formData,
            [event.target.name]: event.target.value,
         },
         event.target.name
      );
   };
   //Desactivar boton de envio del formulario si hay errores
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
         } else if (formData.name.length > 30) {
            setError({
               ...error,
               name: "Name cannot exceed 30 characters.",
            });
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
                  placeholder="Enter your image URL here"
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
