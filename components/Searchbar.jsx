import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import axios from "axios";

function Searchbar() {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showAutocomplete, setShowautocomplete] = useState(false)

  useEffect(() => {
    if(search.split(' ').join('').length === 0) return setShowautocomplete(false)
    const getData = async () => {
      const res = await axios.get(`http://localhost:3000/api/recipes`, {
        params: { search },
      });
      setSuggestions(res.data);
      setShowautocomplete(true)
    };
    getData();
  }, [search]);
 
  return (
    <div className="w-96 h-10 relative bottom-[40px]">
      <div className={`flex items-center w-full h-full py-2 px-3 bg-white shadow-lg ${showAutocomplete ? 'rounded-t-2xl' : 'rounded-2xl'}`}>
        <BiSearch className="text-xl mr-3" />
        <input
          className="outline-none"
          placeholder="Search recipes"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {showAutocomplete && (
        <div className="flex flex-col absolute top-9 right-0 bg-white w-full rounded-b-2xl shadow-lg z">
          {suggestions.map((elem, index) => {
            return (
              <div
                key={index}
                className="cursor-pointer w-full hover:bg-gray-300"
              >
                <span className="ml-2">{elem.title}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Searchbar;
