import React, { FC } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { hideResize } from "../redux/actions";
import { RootState } from "../redux/reducers";

import "../styles/Modal.scss";

interface ModalProps {
  isShowing: boolean;
  imgUrl: string;
  hide: () => void;
}
function mapStateToProps(state: RootState) {
  return {
    url: state.url,
  };
}
const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(
    {
      hideResize,
    },
    dispatch
  ),
});

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  ModalProps;

const Modal: FC<Props> = ({ isShowing, hide, imgUrl, actions }) =>
  isShowing
    ? ReactDOM.createPortal(
        <>
          <div className="modal-overlay" />
          <div className="modal-wrapper">
            <div className="project__modal">
              <button
                type="button"
                className="modal-close"
                onClick={() => {
                  hide();
                  actions.hideResize();
                }}
              >
                X
              </button>
              <div>
                <img src={imgUrl} alt="meme" />
              </div>
            </div>
          </div>
        </>,
        document.body
      )
    : null;

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
