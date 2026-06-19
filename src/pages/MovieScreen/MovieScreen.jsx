import React from "react";
import { useParams } from "react-router-dom";
import { API_KEY } from "../../api/request";
import Banner from "../../components/Banner/Banner";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import Rows from "../../components/Rows/Rows";
import "./MovieScreen.css";
import PreFooter from "../../components/PreFooter/PreFooter";

const MovieScreen = () => {
  const { mediaType, id } = useParams();
  return (
    <>
      <div className="movieScreen">
        <Navbar />
        <Banner movieId={id} movieType={mediaType} />
        <Rows
          title={`You May Also Like`}
          fetchUrl={`${mediaType}/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`}
          isLargeRow
          mediaType={mediaType}
        />
        <Rows
          title={`Similar ${mediaType == "tv" ? "Series" : "Movies"}`}
          fetchUrl={`${mediaType}/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`}
          mediaType={mediaType}
        />
        <PreFooter/>
        <Footer />
      </div>
    </>
  );
};

export default MovieScreen;
