import React, { useEffect } from "react";
import { useState } from "react";
import "./WatchMovieModal.css";

const PlayMovie = ({ movieId, movieType, tvSeasons, latestEpisode }) => {
  const [selectedSeason, setSelectedSeason] = useState("1");
  const [selectedEpisode, setSelectedEpisode] = useState("1");
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
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1200px-Netflix_2015_logo.svg.png"
                alt="Netflix"
                width="80px"
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
              <span className="text-white">
                Use Server 4, If Server 1 is not working
              </span>
              <iframe
                className="mt-2"
                allow="fullscreen encrypted-media"
                gesture="media"
                src={`https://autoembed.to/${movieType}/tmdb/${movieId}-${selectedSeason}-${selectedEpisode}?server=1`}
                width="100%"
                height="380px"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayMovie;
