import { useSelector } from "react-redux";
import useMovieTrailor from "../hooks/useMovieTrailor";

const VideoBackground = ({movieId}) => {
  // fetch my  trailer video && updating the store with the video data 
  const trailerVideo = useSelector(store=> store.movies?.trailorVideo);
 useMovieTrailor(movieId);

  return (
    <div className="w-screen">
      <iframe className="w-screen aspect-video"
      src={"https://www.youtube.com/embed/" + trailerVideo?.key + "?&autoplay=1&mute=1"}
      title="YouTube video player" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" >
      </iframe>
    </div>
  )
}

export default VideoBackground;