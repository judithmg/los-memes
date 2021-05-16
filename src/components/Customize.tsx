import { FC } from "react";
import { setColor, setFontSize } from "../redux/actions";
import { connect } from "react-redux";
import { RootState } from "../redux/reducers";
import { bindActionCreators, Dispatch } from "redux";

function mapStateToProps(state: RootState) {
  return {
    font: state.customize.font,
    color: state.customize.color,
  };
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(
    {
      setColor,
      setFontSize,
    },
    dispatch
  ),
});

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const Customize: FC<Props> = ({ actions }: Props) => {
  return (
    <div>
      <span>Font color:</span>
      <input
        type="color"
        onChange={(e) => actions.setColor(e.target.value)}
      ></input>
      <span>Font size:</span>
      <input
        type="range"
        min="12"
        max="70"
        onChange={(e) => actions.setFontSize(e.target.value)}
      />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Customize);
