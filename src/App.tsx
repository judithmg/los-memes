import React from "react";
import "./App.css";
import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Example from "./custom-drag-layer";

const MemeType = {
  MEME: "Meme",
};

const Text = () => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: MemeType.MEME,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <span
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: "bold",
        cursor: "move",
      }}
    >
      MeMeS
    </span>
  );
};

const Meme = () => {
  return (
    <img
      style={{ width: "600px" }}
      src="https://pyxis.nymag.com/v1/imgs/7fa/2ed/2bda5e6dd39bf7f26a7283a584e796f3c1-24-disloyal-man-meme.rsquare.w700.jpg"
      alt="meme"
    />
  );
};

const App = () => {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Example />
      </DndProvider>
    </>
  );
};

export default App;
