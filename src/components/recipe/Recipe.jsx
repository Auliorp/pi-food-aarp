import { useNavigate } from "react-router-dom";

function Recipe(props) {
   const { name, image, diets, healthScore, id } = props.recipe;
   const navigate = useNavigate();

   const redirectDetail = (id) => {
      navigate(`/detail/${id}`);
   };

   return (
      <div className="recipe" onClick={() => redirectDetail(id)}>
         <div className="image">
            <img src={image} alt={name} width={100} height={100} />
         </div>
         <div className="name-title">Nombre:</div>
         <div className="name">{name}</div>
         <div className="diet-type">Tipo de dieta:</div>
         <div className="diets">
            {diets?.length > 0 &&
               diets.map((diet, index) => (
                  <ul className="diet" key={index}>
                     <li>{diet}</li>
                  </ul>
               ))}

            {!diets?.length > 0 && <div className="div">No tiene</div>}
         </div>
         <div className="health-score">{healthScore}</div>
      </div>
   );
}

export default Recipe;
