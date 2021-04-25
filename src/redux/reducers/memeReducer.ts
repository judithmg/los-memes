import { actionTypes } from "../actions";
import { AnyAction } from "redux";

export default function memeReducer(state = [], action: AnyAction) {
  switch (action.type) {
    case actionTypes.GET_MEMES:
      return action.memes;
    default:
      return state;
  }
}
