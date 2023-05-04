import { useRouter } from "next/router"
function Card({recipe}) {
    const router = useRouter();

    const changePage = () => {
       router.push(`/recipes/${recipe.id}`)
    }
    
   return (
    <div className="w-[300px] min-h-[240px] bg-white shadow-lg cursor-pointer hover:shadow-card" onClick={changePage}>
       <img src={recipe.image} alt={recipe.title} />
       <h2 className="font-medium px-3 py-2">{recipe.title}</h2>
    </div>
   )
}

export default Card