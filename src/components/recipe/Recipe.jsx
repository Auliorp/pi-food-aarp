import { useNavigate } from "react-router-dom";

function Recipe(props) {
   const { name, image, diets, healthScore, id } = props.recipe;
   const navigate = useNavigate();

   const redirectDetail = (id) => {
      navigate(`/detail/${id}`);
   };

   return (
      <div className="recipe" onClick={() => redirectDetail(id)}>
         <div className="image-container">
            <img
               src={image}
               alt={name}
               width={200}
               height={200}
               className="image"
            />
         </div>
         <h4 className="name-title">Name:</h4>
         <div className="name">{name}</div>
         <br />
         <h4 className="diet-type">Types of diets:</h4>
         <div className="diets">
            {diets?.length > 0 &&
               diets.map((diet, index) => (
                  <ul className="diet" key={index}>
                     <li>{diet}</li>
                  </ul>
               ))}

            {!diets?.length > 0 && <div className="div">No tiene</div>}
         </div>
         <br />
         <h4 className="health-score">Health score: {healthScore}</h4>
      </div>
   );
}

export default Recipe;
