import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <>
      <div className="loadingScreen">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Loading;
