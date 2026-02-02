import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utls/constants";
import { addNowPlayingMovies } from "../utls/moviesSlice";

const useNowPlayingMovies = () => {
      const dispatch = useDispatch();
  const getNowPlayingMovies = async () =>{
    const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?&page=1', API_OPTIONS);
    const json = await data.json();
    dispatch(addNowPlayingMovies(json.results));
    console.log("dbjsdhadjdgsjagdjgdjagdaj",json.results);
  };

  useEffect( () => {
    getNowPlayingMovies();
  },[]);
};

export default useNowPlayingMovies;
