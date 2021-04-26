import "./styles/App.scss";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Editor } from "./pages";

const App = () => {
  return (
    <>
      <main>
        <DndProvider backend={HTML5Backend}>
          <Editor />
        </DndProvider>
      </main>
    </>
  );
};

export default App;
