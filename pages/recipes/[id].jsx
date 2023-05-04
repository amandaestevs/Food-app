import { useEffect, useState } from "react";
import { BsCheckLg } from "react-icons/bs";

function RecipePage({ data }) {
  const [isTrue, setIsTrue] = useState([]);
  const {
    title,
    readyInMinutes,
    healthScore,
    servings,
    vegetarian,
    vegan,
    glutenFree,
    nutrition,
    image
  } = data;

  useEffect(() => {
      const array = [];
      if (vegan) {
        array.push("Vegan");
      }
      if (vegetarian) {
        array.push("Vegetarian");
      }
      if (glutenFree) {
        array.push("Gluten Free");
      }
      setIsTrue(array);
  }, []);

  return (
    <div className="flex flex-col items-center min-h-[100vh]">
      <header className="flex flex-col items-center bg-pink-100 w-full mb-4 gap-y-3 p-5">
        <h1 className="mt-3 mb-2 font-bold text-xl">{title}</h1>
        <img src={image} alt={title} width={300} />

        {isTrue.length != 0 && (
          <div className="flex gap-x-4 items-center">
            {isTrue.map((item, index) => {
              return (
                <div key={index} className="flex flex-col items-center p-3">
                  <BsCheckLg className="text-green-600" />
                  <p>{item}</p>
                </div>
              );
            })}
          </div>
        )}

        <section className="flex items-center justify-center">
          <div className="flex flex-col items-center gap-y-2 p-3 border-r border-slate-300">
            <h4 className="font-medium">{readyInMinutes}</h4>
            <p>Minutes</p>
          </div>

          <div className="flex flex-col items-center gap-y-2 p-3 border-r border-slate-300">
            <h4 className="font-medium">{healthScore}</h4>
            <p>Health Score</p>
          </div>

          <div className="flex flex-col items-center gap-y-2 p-3">
            <h4 className="font-medium">{servings}</h4>
            <p>Servings</p>
          </div>
        </section>
      </header>

      <section className="flex flex-col items-center px-5 mb-4">
        <h2 className="mb-3 font-bold text-lg">Ingredients</h2>
        <ul className="list-disc marker:text-pink-400">
          {data.nutrition.ingredients.map((ingredient, index) => {
            return (
              <li key={index}>
                {`${ingredient.amount} ${ingredient.unit} `}
                <span className="font-medium">{ingredient.name}</span>
              </li>
            );
          })}
        </ul>
      </section>

      {data.analyzedInstructions[0] && (
        <section className="flex flex-col items-center py-5 px-6 mb-4">
          <h2 className="mb-3 font-bold text-lg">Instructions</h2>
          <ol>
            {data.analyzedInstructions[0].steps.map((instruction, index) => {
              return (
                <li
                  key={index}
                  className="flex flex-col gap-y-1 justify-center mb-3"
                >
                  <h3 className="font-semibold">{`Step ${index}`}</h3>
                  <p>{instruction.step}</p>
                </li>
              );
            })}
          </ol>
        </section>
      )}

      <section className="flex flex-col items-center p-5 mb-4">
        <h2 className="mb-3 font-bold text-lg">Nutrients</h2>
        <ul className="flex items-center gap-x-4">
          <li className="flex flex-col items-center gap-y-2 py-3 px-5 bg-slate-200 rounded-lg shadow-md">
            <h3 className="font-medium">{`${nutrition.caloricBreakdown.percentProtein}%`}</h3>
            <p>Protein</p>
          </li>
          <li className="flex flex-col items-center gap-y-2 py-3 px-5 bg-slate-200 rounded-lg shadow-md">
            <h3 className="font-medium">{`${nutrition.caloricBreakdown.percentFat}%`}</h3>
            <p>Fat</p>
          </li>
          <li className="flex flex-col items-center gap-y-2 py-3 px-5 bg-slate-200 rounded-lg shadow-md">
            <h3 className="font-medium">{`${nutrition.caloricBreakdown.percentCarbs}%`}</h3>
            <p>Carbs</p>
          </li>
        </ul>
      </section>
    </div>
  );
}

export async function getServerSideProps(context) {
  const API_KEY = process.env.API_KEY;
  const { id } = context.params;
  const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&includeNutrition=true`;
  const res = await fetch(url);
  const data = await res.json();

  return {
    props: { data },
  };
}

export default RecipePage;
