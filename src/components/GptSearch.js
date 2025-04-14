import { BG_IMG } from "../utils/constants";
import GptMoviesSuggestions from "./GptMoviesSuggestions";
import GptSearchBar from "./GptSearchBar";

const GptSearch = () => {
  return (
    <div>
      <div className="fixed -z-10">
        <img src={BG_IMG} alt="Logo" />
      </div>
      <GptSearchBar />
      <GptMoviesSuggestions />
    </div>
  );
};

export default GptSearch;
