import { AppDispatch } from "../store/configureStore";
import axios from "axios";

interface ActionTypes {
  GET_MEMES: string;
  SET_MEME: string;
  SET_BOXES: {};
  SET_FONT_SIZE: string;
  SET_COLOR: string;
}
const actionTypes: ActionTypes = {
  GET_MEMES: "GET_MEMES",
  SET_MEME: "SET_MEME",
  SET_BOXES: "SET_BOXES",
  SET_FONT_SIZE: "SET_FONT_SIZE",
  SET_COLOR: "SET_COLOR",
};

const dbUrl = "https://api.imgflip.com/get_memes";

const getMemes = () => {
  return async (dispatch: AppDispatch) => {
    const {
      data: {
        data: { memes },
      },
    } = await axios.get(dbUrl);
    dispatch({
      type: actionTypes.GET_MEMES,
      memes,
    });
  };
};

const setMeme = (url: string) => {
  return {
    type: actionTypes.SET_MEME,
    url,
  };
};

const setColor = (color: string) => {
  return {
    type: actionTypes.SET_COLOR,
    color,
  };
};

const setFontSize = (font: string) => {
  return {
    type: actionTypes.SET_FONT_SIZE,
    font,
  };
};
const setBoxes = () => {
  return {
    type: actionTypes.SET_BOXES,
  };
};

export { getMemes, setMeme, actionTypes, setColor, setFontSize, setBoxes };
