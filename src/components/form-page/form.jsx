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
      name: "Campo requerido.",
      healthScore: "Campo requerido.",
      steps: "Campo requerido.",
      diets: "Campo requerido.",
   });

   const handleSubmit = async (event) => {
      event.preventDefault();
      const form = document.getElementById("form");
      try {
         // Llama a tu función de servicio para enviar los datos a la base de datos
         const response = await postDiets(formData);

         // Maneja la respuesta de la base de datos según tus necesidades
         console.log("Receta creada exitosamente:", response);

         // Limpia el formulario después de enviar los datos si es necesario
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
            name: "Campo requerido.",
            healthScore: "Campo requerido.",
            steps: "Campo requerido.",
            diets: "Campo requerido.",
         });
      } catch (error) {
         // Manejo de errores en caso de fallo al enviar los datos
         console.error("Error al crear la receta:", error);
      }
   };

   const handleMultiSelectChange = (event) => {
      const selectedOption = event.target.value;
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
      const espaciosRegex = /^\s*$/;
      const letrasRegex = /^[a-zA-Z\s]+$/;

      if (name === "name") {
         if (formData.name === "") {
            setError({ ...error, name: "Campo requerido." });
         } else if (espaciosRegex.test(formData.name)) {
            setError({
               ...error,
               name: "No puede tener espacios vacíos.",
            });
         } else if (!letrasRegex.test(formData.name)) {
            setError({ ...error, name: "Solo se permiten letras" });
         } else {
            setError({ ...error, name: "" });
         }
      }

      if (name === "healthScore") {
         if (formData.healthScore === "") {
            setError({ ...error, healthScore: "Campo requerido." });
         } else if (espaciosRegex.test(formData.healthScore)) {
            setError({
               ...error,
               healthScore: "No puede tener espacios vacíos.",
            });
         } else if (isNaN(formData.healthScore)) {
            setError({ ...error, healthScore: "Solo se permiten números." });
         } else {
            const healthScoreNumber = parseInt(formData.healthScore);
            if (healthScoreNumber < 1 || healthScoreNumber > 100) {
               setError({
                  ...error,
                  healthScore: "Debe ser un número entre 1 y 100.",
               });
            } else {
               setError({ ...error, healthScore: "" });
            }
         }
      }
      if (name === "steps") {
         if (formData.steps === "") {
            setError({ ...error, steps: "Campo requerido." });
         } else if (espaciosRegex.test(formData.steps)) {
            setError({
               ...error,
               steps: "No puede tener espacios vacíos.",
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
               diets: "Debe seleccionar al menos una dieta.",
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
                  placeholder="Ingresa aqui tu nombre"
                  onChange={handleChange}
               />
               <label className="form-error">{error.name}</label>
               <br />

               <label htmlFor="description">Description:</label>
               <input
                  type="text"
                  name="description"
                  placeholder="Ingresa aqui tu descripcion"
                  onChange={handleChange}
               />
               <br />

               <label htmlFor="healthScore">HealthScore:</label>
               <input
                  /* value={formData.healthScore} */
                  type="text"
                  name="healthScore"
                  placeholder="Ingresa aqui tu puntaje de salud"
                  onChange={handleChange}
               />
               <label className="form-error">{error.healthScore}</label>
               <br />

               <label htmlFor="steps">Steps:</label>
               <input
                  /* value={formData.steps} */
                  type="text"
                  name="steps"
                  placeholder="Ingresa aqui el paso a paso"
                  onChange={handleChange}
               />
               <label className="form-error">{error.steps}</label>
               <br />

               <label htmlFor="image">Image:</label>
               <input
                  /* value={formData.image} */
                  type="text"
                  name="image"
                  placeholder="Ingresa aqui tu imagen"
                  onChange={handleChange}
               />
               <br />

               <label htmlFor="diets">Diets:</label>
               <select
                  name="diets"
                  value={formData.diets}
                  onChange={handleMultiSelectChange}
               >
                  <option value="">Selecciona una dieta</option>
                  {dietsData?.map((diet) => (
                     <option key={diet.nombre} value={diet.nombre}>
                        {diet.nombre}
                     </option>
                  ))}
               </select>
               <label className="form-error"> {error.diets}</label>

               <div>
                  Dietas seleccionadas:
                  {formData.diets.map((dietId) => {
                     const selectedDiet = dietsData.find(
                        (diet) => diet.nombre === dietId
                     );
                     return (
                        <div key={dietId} className="chip">
                           {selectedDiet
                              ? selectedDiet.nombre
                              : "Nombre de dieta desconocido"}
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
                  value="Enviar Receta"
               />
            </form>
         </div>
      </>
   );
};

export default FormRecipe;
