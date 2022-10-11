import store from "../store";
import { updateList } from "../actions";

// const dispatch = useDispatch();
export const updateStorage = (movieInfo) => {
  if (!localStorage.hasOwnProperty(movieInfo.id) && movieInfo) {
    if (movieInfo.seasons) {
      movieInfo["media_type"] = "tv";
    } else {
      movieInfo["media_type"] = "movie";
    }
    store.dispatch(updateList(movieInfo));
    localStorage.setItem(movieInfo.id, JSON.stringify(movieInfo));
    window.location.reload();
  }
};
