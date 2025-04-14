import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS, LANG_CONST } from "../utils/constants";
import { useRef } from "react";
import openai from "../utils/openAi";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const languageKey = useSelector((store) => store.config.language);

  const searchmovies = async (movieName) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movieName}`,
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async (event) => {
    event.preventDefault();
    let gptMovies = "";
    try {
      const gptQuery =
        "Act as a Movie Recomendation System and suggest some movies for the query : " +
        searchText.current.value +
        "Only give me results of top 5 movies , comma sepearated like the example result given ahead. Example : Gaddar , Sholay , Don , Golmal , Koi Mil Gaya";
      // eslint-disable-next-line no-unused-vars
      const response = await openai.responses.create({
        model: "gpt-4o",
        input: gptQuery,
      });
    } catch (error) {
      gptMovies = "Gaddar , Sholay , Don , Kick , Koi Mil Gaya".split(",");
      const promiseArray = gptMovies.map((movie) => {
        return searchmovies(movie);
      });
      const resultPromise = await Promise.all(promiseArray);
      dispatch(
        addGptMovieResult({ movieName: gptMovies, movieResult: resultPromise })
      );
    }
  };

  return (
    <div
      className="pt-[40%] md:pt-[10%] flex justify-center"
      onSubmit={handleGptSearchClick}
    >
      <form className="w-full md:w-1/2  grid grid-cols-12">
        <input
          ref={searchText}
          className="p-4 m-4 bg-white col-span-9"
          type="text"
          placeholder={LANG_CONST[languageKey].placeholder}
        />
        <button
          type="submit"
          className="m-4 py-2 px-4 bg-red-700 text-white rounded-lg col-span-3"
        >
          {LANG_CONST[languageKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
