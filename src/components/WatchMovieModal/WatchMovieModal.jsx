import React, { useEffect } from "react";
import { useState, useRef } from "react";
import "./WatchMovieModal.css";

const PlayMovie = ({ movieId, movieType, tvSeasons, latestEpisode }) => {
  const [selectedSeason, setSelectedSeason] = useState("1");
  const [selectedEpisode, setSelectedEpisode] = useState("1");
  const [selectedServer, setSelectedServer] = useState("1");
  const [epCount, setEpCount] = useState(
    !tvSeasons ? "1" : `"${tvSeasons[1]?.episode_count}"`
  );

  useEffect(() => {
    if (movieType == "tv") {
      if (latestEpisode && selectedSeason == latestEpisode.season_number) {
        setEpCount(latestEpisode.episode_number + 1);
      } else {
        setEpCount(tvSeasons[selectedSeason - 1]?.episode_count + 1 || "1");
      }
    }
  }, [selectedSeason]);

  const movieServerList = (media_type, serverId, contentId, selectedSeason, selectedEp) => {

    if(media_type == "tv"){
      switch(serverId) {
        case "1":
          return `https://vsembed.ru/embed/tv?tmdb=${contentId}&season=${selectedSeason}&episode=${selectedEp}`
        case "2": 
          return `https://multiembed.mov/?video_id=${contentId}&tmdb=1&s=${selectedSeason}&e=${selectedEp}`
        case "3": 
          return `https://www.2embed.skin/embedtv/${contentId}&s=${selectedSeason}&e=${selectedEp}`
        default:
          return `https://vsembed.ru/embed/tv?tmdb=${contentId}&season=${selectedSeason}&episode=${selectedEp}`
      }
    }
    else {
      switch(serverId) {
        case "1":
          return `https://vsrc.su/embed/movie/${contentId}/`
        case "2": 
          return `https://multiembed.mov?video_id=${contentId}&tmdb=1`
        case "3": 
          return `https://www.2embed.skin/embed/${contentId}`
        default:
          return `https://vsrc.su/embed/movie/${contentId}/`

      }
    }
  }

  const iframeRef = useRef(null);

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
                src="/public/images/hulk-logo.svg"
                alt="Netflix"
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
                {Array.from(Array(4).keys())
                  .slice(1)
                  .map((item) => (
                    <option value={item}>Server {item}</option>
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
