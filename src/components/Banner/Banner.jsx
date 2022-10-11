import React, { useEffect, useState } from "react";
import "./Banner.css";
import TrailerModal from "../TrailerModal/TrailerModal";
import instance from "../../api/axios";
import Loading from "../Loading/Loading";
import WatchMovieModal from "../WatchMovieModal/WatchMovieModal";
import "react-circular-progressbar/dist/styles.css";
import requests, { API_KEY } from "../../api/request";
import MyList from "../MyList/MyList";
import { useDispatch, useSelector } from "react-redux";
import { updateList } from "../../actions/index";
import Progressbar from "../CircularProgressBar/ProgressBar";

const Banner = ({ movieId, movieType }) => {
  const [movieInfo, setMovieInfo] = useState();
  const [loading, setLoading] = useState(true);
  const [myList, setMyList] = useState([]);
  const myState = useSelector((state) => state.movieLocalStorage);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMovie = async () => {
      await instance
        .get(
          `/${movieType}/${movieId}?api_key=${API_KEY}&append_to_response=videos,release_dates`
        )
        .then((result) => {
          console.log(
            "🚀 ~ file: Banner.jsx ~ line 28 ~ .then ~ result",
            result
          );
          setMovieInfo(result?.data);
          setLoading(false);
          return result;
        })
        .catch((error) => {
          console.warn(error.message);
        });
    };
    fetchMovie();
  }, [movieId, movieType]);

  const truncate = (string, n) => {
    return string.length > n ? string.substr(0, n - 1) + `...` : string;
  };

  function calMovieRuntime(runtime) {
    let hours = Math.floor(runtime / 60);
    let minutes = runtime % 60;
    if (hours == 0) {
      return `${minutes}m`;
    } else {
      return `${hours}h ${minutes}m`;
    }
  }

  const addToStorage = (movieInfo) => {
    if (!localStorage.hasOwnProperty(movieInfo.id) && movieInfo) {
      let newList = [myState];
      if (movieInfo.seasons) {
        movieInfo["media_type"] = "tv";
        newList.push(movieInfo);
      } else {
        movieInfo["media_type"] = "movie";
        newList.push(movieInfo);
      }
      dispatch(updateList(movieInfo));
      localStorage.setItem(movieInfo.id, JSON.stringify(movieInfo));
      setMyList(newList);
    }
  };

  useEffect(() => {}, [myList]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <header className="banner">
            <div
              className="banner__content"
              style={{
                backgroundImage: `url("${requests.imageUrlPrefix}${
                  movieInfo?.backdrop_path || movieInfo?.poster_path || ""
                }")`,
                backgroundSize: "cover",
                backgroundPosition: "top center",
              }}
            ></div>
            <div className="banner__info">
              <h1 className="banner__title d-flex flex-direction-row">
                {movieInfo?.title ||
                  movieInfo?.name ||
                  movieInfo?.original_title ||
                  movieInfo?.original_name}
                <span>
                  (
                  {movieInfo?.release_date?.substring(0, 4) ||
                    movieInfo?.first_air_date?.substring(0, 4) ||
                    "2022"}
                  )
                </span>
              </h1>
              <div className="banner__genres">
                {movieInfo?.genres &&
                  movieInfo.genres
                    .slice(0, 3)
                    .map((gen) => (
                      <span className="genres__info">{gen.name}</span>
                    ))}
                <span className="banner__runtime">
                  {movieInfo && movieType == "movie"
                    ? calMovieRuntime(movieInfo?.runtime || 120)
                    : calMovieRuntime(
                        movieInfo?.episode_run_time[0] ||
                          movieInfo?.last_episode_to_air?.runtime ||
                          40
                      )}
                </span>
              </div>
              <div className="banner__buttons">
                <button
                  className="banner_btn"
                  data-bs-toggle="modal"
                  data-bs-target="#playTrailer"
                >
                  Play Trailer
                  <i className="fa-solid fa-play ms-md-3 ms-2"></i>
                </button>

                <button data-bs-toggle="modal" data-bs-target="#streamMovie">
                  Watch Now
                  <i className="fa-solid fa-play ms-md-3 ms-2"></i>
                </button>
                <button data-bs-toggle="modal" data-bs-target="#openMyList">
                  <i className="fa-solid fa-list"></i>
                </button>
                <button
                  className="give__heart"
                  onClick={() => addToStorage(movieInfo)}
                >
                  {!localStorage.hasOwnProperty(movieId) ? (
                    <i className="fa-solid fa-heart tooltip__info"></i>
                  ) : (
                    <i
                      className="fa-solid fa-heart tooltip__info"
                      style={{ color: "red" }}
                    ></i>
                  )}
                </button>
              </div>
              <div className="banner__progress">
                <p className="banner__description">
                  {truncate(movieInfo?.overview || "description", 150)}
                </p>
                <div className="banner__progressbar text-center">
                  <Progressbar votes={movieInfo?.vote_average || 7.4} />
                  <span className="user__score">User Score</span>
                </div>
              </div>
            </div>

            <div className="banner__fadeBottom"></div>
          </header>

          <TrailerModal embedKey={movieInfo?.videos?.results} />
          <WatchMovieModal
            movieId={movieId}
            movieType={movieType}
            tvSeasons={
              movieInfo?.seasons && movieInfo?.seasons[0]?.season_number == 0
                ? movieInfo?.seasons.slice(1)
                : movieInfo?.seasons
            }
            latestEpisode={movieInfo?.last_episode_to_air || false}
          />
          <MyList favouriteMovies={myList} />
        </>
      )}
    </>
  );
};

export default Banner;
