import Card from "../../components/Card";

function RecommendedRandom({ data }) {
  const { recipes } = data;

  return (
    <div className="w-full min-h-[100vh]">
      <h1 className="text-xl font-bold text-center my-4">Recommended</h1>
      <div className="flex flex-wrap justify-center  gap-6 p-6">
        {recipes.map((recipe, index) => {
          return <Card key={index} recipe={recipe} />;
        })}
      </div>
    </div>
  );
}

export default RecommendedRandom;

export async function getServerSideProps() {
  const API_KEY = process.env.API_KEY;
  const url = `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=9`;
  const res = await fetch(url);
  const data = await res.json();

  return {
    props: { data },
  };
}
