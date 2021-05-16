import { CSSProperties, FC, memo } from "react";
import { connect } from "react-redux";
import { RootState } from "../redux/reducers";

export interface BoxProps {
  yellow?: boolean;
}

function mapStateToProps(state: RootState) {
  return {
    font: state.customize.font,
    color: state.customize.color,
    hideResize: state.customize.hideResize,
  };
}

type Props = ReturnType<typeof mapStateToProps> & BoxProps;

const Box: FC<Props> = memo(function Box({ yellow, font, color, hideResize }) {
  const styles: CSSProperties = {
    fontSize: `${font}px`,
    backgroundColor: "transparent",
    border: "transparent",
    padding: "0.5rem 1rem",
    cursor: "move",
    color: `${color}`,
  };

  const backgroundColor = yellow ? "yellow" : "transparent";
  return (
    <textarea
      className={`${hideResize ? "hideResize" : ""}`}
      style={{ ...styles, backgroundColor }}
      defaultValue="[Your caption here]"
    ></textarea>
  );
});

export default connect(mapStateToProps)(Box);
