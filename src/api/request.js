const API_KEY = import.meta.env.VITE_API_KEY;
const date = new Date();
const [y, m, d] = [
  date.getFullYear(),
  date.getMonth() + 1,
  date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(),
];
console.log(`${y}-${m}-${d}`);
const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `discover/tv?api_key=${API_KEY}&with_networks=213`,
  fetchTrendingMovies: `trending/movie/week?api_key=${API_KEY}`,
  fetchTrendingSeries: `trending/tv/week?api_key=${API_KEY}`,
  fetchPopularMovies: `movie/popular?api_key=${API_KEY}`,
  fetchRecommendation: `movie/610150/recommendations?api_key=${API_KEY}&language=en-US&page=1`,
  fetchSimilarMovies: `movie/610150/similar?api_key=${API_KEY}&language=en-US&page=1`,
  fetchNewPremiers: `discover/movie?api_key=${API_KEY}&sort_by=release_date.desc&page=1&release_date.gte=2022-09-01&release_date.lte=${y}-${m}-${d}&with_original_language=hi&vote_average.gte=5`,
  fetchNetflixHindiTv: `discover/tv?api_key=${API_KEY}&with_networks=213&with_original_language=hi&vote_average.gte=5&with_region=IN&with_watch_monetization_types=flatrate&sort_by=popularity.desc`,
  fetchAmazonPrimeHindiTv: `discover/tv?api_key=${API_KEY}&with_networks=1024&with_original_language=hi&vote_average.gte=5&with_region=IN&with_watch_monetization_types=flatrate&sort_by=popularity.desc`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
  imageUrlPrefix: "https://image.tmdb.org/t/p/original",
};
export default requests;
export { API_KEY };
