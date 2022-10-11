import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./SearchScreen.css";
import instance from "../../api/axios";
import SearchMovie from "../../components/SearchMovie/SearchMovie";
import { useSearchParams } from "react-router-dom";
import { API_KEY } from "../../api/request";

const SearchScreen = () => {
  const [searchList, setSearchList] = useState(Array);
  let searchQuery = "Beast";
  const [searchParams] = useSearchParams();
  searchQuery = searchParams.get("input");

  useEffect(() => {
    const searchData = async () => {
      await instance
        .get(
          `search/multi?api_key=${API_KEY}&language=en-US&query=${searchQuery}&page=1&include_adult=false`
        )
        .then((result) => {
          setSearchList(result?.data?.results);
          return result;
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
    searchData();
  }, []);

  return (
    <>
      <div className="searchScreen">
        <Navbar />
        <SearchMovie searchList={searchList} />
      </div>
    </>
  );
};

export default SearchScreen;
