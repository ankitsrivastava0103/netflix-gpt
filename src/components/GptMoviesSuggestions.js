import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMoviesSuggestions = () => {
  const gpt = useSelector((store) => store.gpt);

  const { movieName, movieResult } = gpt;

  if (!movieResult) {
    return null;
  }

  return (
    <div className="p-4 m-4 bg-black text-white opacity-80">
      <div>
        {movieResult.map((movie, index) => {
          return (
            <MovieList
              key={movieName[index]}
              title={movieName[index]}
              movies={movie}
            />
          );
        })}
        <MovieList />
      </div>
    </div>
  );
};

export default GptMoviesSuggestions;
