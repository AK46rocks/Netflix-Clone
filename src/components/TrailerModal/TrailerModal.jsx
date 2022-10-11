import React, { useEffect, useState } from "react";
import "./TrailerModal.css";

const Modal = ({ embedKey }) => {
  const [youtubeKey, setYoutubeKey] = useState("tgbNymZ7vqY");

  useEffect(() => {
    const fetchTrailer = async () => {
      if (embedKey.length > 0) {
        setYoutubeKey(embedKey[0].key);
        embedKey.forEach((movie) => {
          if (movie.name === "Official Trailer") {
            setYoutubeKey(movie.key);
          }
        });
      }
    };
    fetchTrailer();
  }, [embedKey]);

  return (
    <>
      <div
        className="modal fade"
        id="playTrailer"
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
              {embedKey.length === 0 ? (
                <h3 style={{ color: "white" }}>Sorry, No Trailer Found!!</h3>
              ) : (
                <iframe
                  allow="fullscreen"
                  src={`https://www.youtube.com/embed/${youtubeKey}?autoplay=0&loop=0&controls=1`}
                  width="100%"
                  height="380px"
                ></iframe>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
