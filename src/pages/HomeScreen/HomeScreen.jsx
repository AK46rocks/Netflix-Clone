import React, { useEffect, useState } from "react";
import instance from "../../api/axios";
import requests from "../../api/request";
import Banner from "../../components/Banner/Banner";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import Rows from "../../components/Rows/Rows";
import "./HomeScreen.css";

function HomeScreen() {
  const [movieId, setMovieId] = useState("");
  const [movieType, setMovieType] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      await instance
        .get(requests.fetchTrending)
        .then((result) => {
          let movies = result.data?.results.slice(0, 15);
          let randomNumber = Math.floor(Math.random() * movies.length);
          setMovieId(movies[randomNumber].id);
          setMovieType(movies[randomNumber].media_type);

          return result;
        })
        .catch((error) => console.log("Internet Connection Error", error));
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="homeScreen">
        {/* Navbar */}
        <Navbar />
        {/* HeroSection */}
        <Banner movieId={movieId} movieType={movieType} />

        {/* Rows */}
        <Rows
          title={"Trending English Movies"}
          fetchUrl={requests.fetchTrendingMovies}
          isLargeRow
          mediaType={"movie"}
        />
        <Rows
          title={"Trending Hindi Movies"}
          fetchUrl={requests.fetchNewPremiers}
          isLargeRow
          mediaType={"movie"}
        />
        <Rows
          title={"Trending English Shows"}
          fetchUrl={requests.fetchTrendingSeries}
          isLargeRow
          mediaType={"tv"}
        />
        <Rows
          title={"Prime Hindi Shows"}
          fetchUrl={requests.fetchAmazonPrimeHindiTv}
          isLargeRow
          mediaType={"tv"}
        />
        <Rows
          title={"Netflix Hindi Shows"}
          fetchUrl={requests.fetchNetflixHindiTv}
          isLargeRow
          mediaType={"tv"}
        />
        <Rows
          title={"Netflix Originals"}
          fetchUrl={requests.fetchNetflixOriginals}
          isLargeRow
          mediaType={"tv"}
        />

        {/* <Rows
          title={"Popular Movies"}
          fetchUrl={requests.fetchPopularMovies}
          mediaType={"movie"}
        /> */}
        {/* <Rows title={"Action Movies"} fetchUrl={requests.fetchActionMovies} />
        <Rows title={"Comedy Movies"} fetchUrl={requests.fetchComedyMovies} />
        <Rows title={"Documentaries"} fetchUrl={requests.fetchDocumentaries} />
        <Rows title={"Horror Movies"} fetchUrl={requests.fetchHorrorMovies} />
        <Rows title={"Romance Movies"} fetchUrl={requests.fetchRomanceMovies} /> */}
        <Footer />
      </div>
    </>
  );
}

export default HomeScreen;
