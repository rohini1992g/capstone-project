import axios from "axios";
import { SearchIcon } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Search = () => {
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:8000/api/v1/user/search?keyword=${query}`
      );

      setSearchResult(res.data);
    };

    if (query?.length) {
      fetchData();
    }
  }, [query]);
  return (
    <div className=" mt-10 ">
      <div className="flex pl-8 bg-gray-100 h-10 rounded-xl">
        <SearchIcon className=" h-10" />
        <input
          type="text"
          placeholder="Search for friends........"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className=" pl-3 bg-gray-100 rounded-xl "
        />
      </div>

      {query?.length > 0 &&
        searchResult?.map((res) => (
          <Link to={`/profile/${res?._id}`}>
            <div className="mt-3 ml-10 ">{res?.username}</div>
          </Link>
        ))}
    </div>
  );
};
export default Search;
