import Card from "../../components/Card";

function Recommended({ data }) {
  const { results } = data;
  return (
    <div className="w-full min-h-[100vh]">
      <h1 className="text-xl font-bold text-center my-4">Recommended</h1>
      <div className="flex flex-wrap justify-center  gap-6 p-6">
        {results.map((recipe, index) => {
          return <Card key={index} recipe={recipe} />;
        })}
      </div>
    </div>
  );
}

export default Recommended;

export async function getServerSideProps(context) {
  const API_KEY = process.env.API_KEY;
  const { cuisine, intolerences, diet, search } = context.query;
  const url1 = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${search}&number=9`;
  const url2 = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&cuisine=${cuisine}&intolerences=${intolerences}&diet=${diet}&number=9`;
  const url = search != undefined ? url1 : url2;
  const res = await fetch(url);
  const data = await res.json();

  return {
    props: { data },
  };
}
