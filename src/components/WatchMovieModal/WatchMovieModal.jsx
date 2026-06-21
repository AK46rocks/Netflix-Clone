import React, { useEffect } from "react";
import { useState, useRef } from "react";
import instance from "../../api/axios";
import "./WatchMovieModal.css";

const PlayMovie = ({ movieId, movieType, tvSeasons, latestEpisode }) => {
  const iframeRef = useRef(null);

  const [selectedSeason, setSelectedSeason] = useState("1");
  const [selectedEpisode, setSelectedEpisode] = useState("1");
  const [selectedServer, setSelectedServer] = useState("1");
  const [epCount, setEpCount] = useState(
    !tvSeasons ? "1" : `"${tvSeasons[1]?.episode_count}"`
  );
  const [imdbId, setImdbId] = useState(0);

  useEffect(() => {
    if (movieType == "tv") {
      if (latestEpisode && selectedSeason == latestEpisode.season_number) {
        setEpCount(latestEpisode.episode_number + 1);
      } else {
        setEpCount(tvSeasons[selectedSeason - 1]?.episode_count + 1 || "1");
      }
    }
  }, [selectedSeason]);

  useEffect(() => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const fetchImdbIdUrl = `/${movieType}/${movieId}/external_ids?api_key=${API_KEY}`

    const fetchData = async () => {
      await instance
        .get(fetchImdbIdUrl)
        .then((getData) => {
          setImdbId(getData?.data['imdb_id']);
          return getData?.data['imdb_id'];
        })
        .catch((error) => console.error("Internet Connection Error", error));
    };

    fetchData();
  }, []);

  const movieServerList = (media_type, serverId, contentId, selectedSeason, selectedEp) => {

    if(media_type == "tv"){
      switch(serverId) {
        case "2":
          return `https://vsembed.ru/embed/tv?tmdb=${contentId}&season=${selectedSeason}&episode=${selectedEp}`
        case "5": 
          return `https://multiembed.mov/?video_id=${contentId}&tmdb=1&s=${selectedSeason}&e=${selectedEp}`
        case "3": 
          return `https://www.2embed.skin/embedtv/${contentId}&s=${selectedSeason}&e=${selectedEp}`
        case "1":  
          return `https://web.nxsha.app/embed/tv/${contentId}/${selectedSeason}/${selectedEp}?lang=hindi&autoplay=true`
        case "4": 
          return `https://gemma416okl.com/play/${imdbId}`
        default:
          return `https://vsembed.ru/embed/tv?tmdb=${contentId}&season=${selectedSeason}&episode=${selectedEp}`
      }
    }
    else {
      switch(serverId) {
        case "2":
          return `https://vsrc.su/embed/movie/${contentId}/`
        case "5": 
          return `https://multiembed.mov?video_id=${contentId}&tmdb=1`
        case "3": 
          return `https://www.2embed.skin/embed/${contentId}`
        case "1": 
          return `https://web.nxsha.app/embed/movie/${contentId}?lang=hindi&autoplay=true`
        case "4": 
          return `https://gemma416okl.com/play/${imdbId}`
        default:
          return `https://vsrc.su/embed/movie/${contentId}/`

      }
    }
  }

  const handleFullscreen = () => {
    const iframe = iframeRef.current;
  
    // 1. Safety check MUST be first
    if (!iframe) {
      console.error("Iframe ref is not available yet.");
      return;
    }
  
    // 2. Check and trigger the correct modern/vendor method safely
    if (iframe.requestFullscreen) {
      iframe.requestFullscreen();
    } else if (iframe.webkitRequestFullscreen) { /* Safari / Older Chrome */
      iframe.webkitRequestFullscreen();
    } else if (iframe.mozRequestFullScreen) { /* Older Firefox */
      iframe.mozRequestFullScreen();
    } else if (iframe.msRequestFullscreen) { /* Older IE/Edge */
      iframe.msRequestFullscreen();
    } else {
      console.error("Fullscreen API is not supported by this browser.");
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="streamMovie"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-dark">
              <img
                src="/images/hulk-logo.svg"
                alt="HulkuTV"
                width="60px"
              />
              <button
                type="button"
                className="btn-close bg-light"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body bg-dark">
              {movieType == "tv" ? (
                <>
                  <select
                    className="select__season"
                    onChange={(e) => setSelectedSeason(e.target.value)}
                  >
                    {tvSeasons &&
                      tvSeasons.map((season) => (
                        <option
                          value={season.season_number}
                          disabled={season.episode_count == 0 ? true : false}
                        >
                          {season.name}
                        </option>
                      ))}
                  </select>
                  <select
                    className="select__ep"
                    onChange={(e) => setSelectedEpisode(e.target.value)}
                  >
                    {Array.from(Array(epCount).keys())
                      .slice(1)
                      .map((epNo) => (
                        <option value={epNo}>Episode {epNo}</option>
                      ))}
                  </select>
                  <br></br>
                </>
              ) : (
                <></>
              )}
              <select
                className="select__server"
                onChange={(e) => setSelectedServer(e.target.value)}
              >
                {Array.from(Array(6).keys())
                  .slice(1)
                  .map((item) => (
                    <option value={item}>Server {item} {item == 1 || item == 4 ? "(Multi-Lang)":""}</option>
                  ))}
              </select>

              <iframe
              ref={iframeRef}
                className="mt-2"
                gesture="media"
                src={movieServerList(movieType, selectedServer, movieId, selectedSeason, selectedEpisode)}
                width="100%"
                height="400px"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                allowFullScreen
              ></iframe>

              <button
                onClick={handleFullscreen}
                className="fs__button"
              >
                Watch Fullscreen
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayMovie;
