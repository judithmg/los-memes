import { actionTypes } from "../actions";
import { AnyAction } from "redux";

export default function customizeReducer(
  state = {
    font: "",
    color: "",
    hideResize: false,
  },
  action: AnyAction
) {
  switch (action.type) {
    case actionTypes.SET_FONT_SIZE:
      return { ...state, font: action.font };
    case actionTypes.SET_COLOR:
      return { ...state, color: action.color };
    case actionTypes.HIDE_RESIZE:
      return { ...state, hideResize: !state.hideResize };
    default:
      return state;
  }
}
