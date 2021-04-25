import { combineReducers } from "redux";
import url from "./urlReducer";
import memes from "./memeReducer";
import customize from "./customizeReducer";

const rootReducer = combineReducers({
  url,
  memes,
  customize,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
