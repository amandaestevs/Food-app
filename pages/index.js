import Searchbar from "../components/Searchbar"
import PersonalizedSearch from "@/components/PersonalizedSearch"

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center gap-y-10 px-6 py-7 bg-main-img bg-cover">
         <Searchbar />
         <PersonalizedSearch />
    </main>
  )
}
