import { useEffect } from "react";  
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utls/constants";
import { addTrailorVideo } from "../utls/moviesSlice";

const useMovieTrailor = (movieId) => {
  const dispatch = useDispatch();
  const getMoviesVideos = async () => {
    const data = await fetch("https://api.themoviedb.org/3/movie/" + movieId + "/videos?language=en-US", API_OPTIONS);
    const json = await data.json();
    console.log(json);

    const filterData = json.results.filter(video => video.type ==="Trailer");
    const trailor = filterData.length ? filterData[0] : json.results[0];
    console.log(trailor);
    dispatch(addTrailorVideo(trailor));
  };

  useEffect(() => {
    getMoviesVideos();
  },[]);

}

export default useMovieTrailor;