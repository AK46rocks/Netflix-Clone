import React, { useState } from "react";
import { useEffect } from "react";
import instance from "../../api/axios";
import "./Rows.css";
import requests from "../../api/request";
import { useNavigate } from "react-router-dom";

const Rows = ({ title, fetchUrl, isLargeRow = false, mediaType }) => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await instance
        .get(fetchUrl)
        .then((getData) => {
          setMovies(getData.data?.results.slice(0, 12));
          return getData;
        })
        .catch((error) => {
          return console.log(error.message);
        });
    };

    fetchData();
  }, [fetchUrl]);

  return (
    <>
      {movies.length > 0 ? (
        <>
          <div className="rows mt-3">
            <h1 className="rows__title">{title}</h1>
            <div className="rows__posters">
              {movies.map((movies) => (
                <>
                  <img
                    className={isLargeRow ? "img-top-lg" : "img-top"}
                    key={movies.id}
                    src={`${requests.imageUrlPrefix}${
                      isLargeRow ? movies.poster_path : movies.backdrop_path
                    }`}
                    alt={movies.name}
                    onClick={() =>
                      // (window.location.href = `/content/${mediaType}/${movies.id}`)
                      navigate(`/content/${mediaType}/${movies.id}`)
                    }
                  />
                </>
              ))}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Rows;
