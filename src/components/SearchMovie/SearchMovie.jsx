import React from "react";
import { useNavigate } from "react-router-dom";
import requests from "../../api/request";
import "./SearchMovie.css";

const SearchResult = ({ searchList }) => {
  const navigate = useNavigate();
  return (
    <>
      <header className="search__result">
        <div
          className="container-fluid search__row"
          style={{ backgroundColor: "black" }}
        >
          <div className="row overflow-hidden">
            <h2 className="search__heading">Search Results</h2>
            <div className="col-md-1"></div>
            <div className="col-md-10">
              <div className="movie__result">
                {searchList.map((item) =>
                  item.media_type == "movie" || item.media_type == "tv" ? (
                    <div className="card search__result__card" key={item.id}>
                      <img
                        src={
                          !item.poster_path
                            ? "https://st.depositphotos.com/1116329/5039/v/450/depositphotos_50398461-stock-illustration-vector-black-web-icon-on.jpg"
                            : `${requests.imageUrlPrefix}${
                                item?.poster_path || item?.backdrop_path
                              }`
                        }
                        onClick={() =>
                          // (window.location.href = `/content/${item.media_type}/${item.id}`)
                          navigate(`/content/${item.media_type}/${item.id}`)
                        }
                        alt="Movie"
                      />
                      <span>{item.media_type}</span>
                      <h5>
                        {item?.title || item?.original_title || item?.name}
                      </h5>
                    </div>
                  ) : (
                    <></>
                  )
                )}
              </div>
            </div>
            <div className="col-md-1"></div>
          </div>
        </div>

        <div className="search__fadeBottom"></div>
      </header>
    </>
  );
};

export default SearchResult;
