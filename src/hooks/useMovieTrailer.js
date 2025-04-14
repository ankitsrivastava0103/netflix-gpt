import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideoId } from "../utils/moviesSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  const trailerVideoId = useSelector((store) => store.movies?.trailerVideoId);

  useEffect(() => {
    !trailerVideoId && getMovieVideo();
  }, []);

  const getMovieVideo = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos`,
      API_OPTIONS
    );
    const json = await data.json();

    const filterData = json.results?.filter((it) => it.type === "Trailer");

    const trailer = filterData.length ? filterData[0] : json.results[0];
    dispatch(addTrailerVideoId(trailer.key));
  };
};

export default useMovieTrailer;
