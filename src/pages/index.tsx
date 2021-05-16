import { FC } from "react";
import Container from "../components/Container";
import { CustomDragLayer } from "../components/CustomDragLayer";

export const Editor: FC = () => {
  return (
    <div className="editor__container">
      <Container />
      <CustomDragLayer />
    </div>
  );
};
