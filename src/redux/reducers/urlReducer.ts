import { actionTypes } from "../actions";
import { AnyAction } from "redux";

export default function urlReducer(state = "", action: AnyAction) {
  switch (action.type) {
    case actionTypes.SET_MEME:
      return action.url;
    default:
      return state;
  }
}
