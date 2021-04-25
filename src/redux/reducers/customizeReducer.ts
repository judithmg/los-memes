import { actionTypes } from "../actions";
import { AnyAction } from "redux";

export default function customizeReducer(
  state = {
    font: "",
    color: "",
    boxes: {
      0: { top: -400, left: 0 },
      1: { top: -300, left: 500 },
    },
  },
  action: AnyAction
) {
  switch (action.type) {
    case actionTypes.SET_FONT_SIZE:
      return { ...state, font: action.font };
    case actionTypes.SET_COLOR:
      return { ...state, color: action.color };
    case actionTypes.SET_BOXES:
      return { ...state, boxes: action.boxes };
    default:
      return state;
  }
}
