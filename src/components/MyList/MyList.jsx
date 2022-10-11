import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteItemFromList } from "../../actions";
import requests from "../../api/request";
import "./MyList.css";

const MyList = ({ favouriteMovies }) => {
  const myState = useSelector((state) => state.movieLocalStorage);
  const [favList, setFavList] = useState(myState?.myList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeMovieFromMyList = (movieId) => {
    localStorage.removeItem(movieId);
    let movieIndex = myState.myList.findIndex((item) => item.id == movieId);
    let newList = [...myState.myList];
    if (movieIndex > -1) {
      newList.splice(movieIndex, 1);
      dispatch(deleteItemFromList(newList));
    }
    setFavList(newList);
  };

  useEffect(() => {}, [favList]);

  return (
    <>
      <div
        className="modal fade text-white"
        id="openMyList"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg ">
          <div className="modal-content">
            <div className="modal-header bg-dark">
              MY LIST
              <button
                id="close__modal"
                type="button"
                className="btn-close bg-light"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body bg-dark">
              <div className="row">
                {!favouriteMovies.length == 0 || myState ? (
                  myState.myList.map((list) => (
                    <div className="col-md-4 col-sm-3">
                      <div className="card mylist__card">
                        <img
                          src={`${requests.imageUrlPrefix}${list.poster_path}`}
                          alt="MyList"
                          onClick={() => {
                            document.getElementById("close__modal").click();
                            navigate(`/content/${list.media_type}/${list.id}`);
                          }}
                        />
                        <button
                          className="btn btn-danger remove__movie"
                          onClick={() => removeMovieFromMyList(list.id)}
                        >
                          Remove from List
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <span className="text-white">
                    Go ahead and create your list NOW!!
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyList;
