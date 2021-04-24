import React from "react";
import "./App.scss";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Example from "./custom-drag-layer";

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
