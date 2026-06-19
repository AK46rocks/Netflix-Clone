import axios from "axios";

const seApi = axios.create({
  baseURL: "https://seapi.link",
});

export default seApi;


// https://getsuperembed.link/?video_id=556694&tmdb=1&season=0&episode=0&player_loader=1&preferred_server=0&player_sources_toggle_type=1

//https://autoembed.to/${movieType}/tmdb/${movieId}-${selectedSeason}-${selectedEpisode}?server=1


// Server 2 (In use)
// https://multiembed.mov?video_id=931285&tmdb=1 (DONE)

// Server 3 (In use)
// https://www.2embed.skin/embed/278 (Working)

//Server 1 (In Use)
// https://vsrc.su/embed/movie/931285/
// https://vsrc.su/embed/tv?tmdb=tt0944947


//Server 4 
// https://web.nxsha.app/embed/tv/84105/1/1?lang=hindi&autoplay=true
// https://web.nxsha.app/embed/movie/1451344?lang=hindi&autoplay=true

//Server 5

// Server 4 (Not using , but working)
// https://www.NontonGo.win/embed/movie/931285/
// https://www.NontonGo.win/embed/tv/

// Server 5 (Not in use)
// https://remotestre.am/e/?tmdb=931285