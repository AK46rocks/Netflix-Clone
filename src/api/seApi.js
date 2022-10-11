import axios from "axios";

const seApi = axios.create({
  baseURL: "https://seapi.link",
});

export default seApi;

// https://getsuperembed.link/?video_id=556694&tmdb=1&season=0&episode=0&player_loader=1&preferred_server=0&player_sources_toggle_type=1
