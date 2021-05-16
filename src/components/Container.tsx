import { createRef, CSSProperties, FC, useCallback, useState } from "react";

import { connect } from "react-redux";
import { RootState } from "../redux/reducers";
import { useDrop } from "react-dnd";
import update from "immutability-helper";
import { bindActionCreators, Dispatch } from "redux";

import { hideResize } from "../redux/actions";

import { ItemTypes } from "../interfaces/ItemTypes";
import { DraggableBox } from "./DraggableBox";
import { DragItem } from "../interfaces/interfaces";

import domtoimage from "dom-to-image";

import MemesBox from "./MemesBox";
import Customize from "./Customize";
import useModal from "../hooks/useModal";
import Modal from "./Modal";

const styles: CSSProperties = {
  position: "relative",
};

interface BoxMap {
  [key: string]: { top: number; left: number };
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
  ReturnType<typeof mapDispatchToProps>;

const Container: FC<Props> = ({ url, actions }) => {
  const memeNode = createRef<HTMLDivElement>();
  const [imgUrl, setImgUrl] = useState("");

  const { isShowing, toggle } = useModal();

  const [boxes, setBoxes] = useState<BoxMap>({
    1: { top: 0, left: 0 },
    2: { top: 0, left: 200 },
  });
  const moveBox = useCallback(
    (id: string, left: number, top: number) => {
      setBoxes(
        update(boxes, {
          [id]: {
            $merge: { left, top },
          },
        })
      );
    },
    [boxes]
  );

  const newBoxes = (boxes: BoxMap) => {
    setBoxes(
      Object.fromEntries([
        ...Object.entries(boxes),
        [
          +Object.entries(boxes)[Object.entries(boxes).length - 1][0] + 1,
          { top: 0, left: 200 },
        ],
      ])
    );
  };

  const deleteArea = (key: string) => {
    setBoxes(
      Object.fromEntries(Object.entries(boxes).filter((id) => +id[0] !== +key))
    );
  };

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop(item: DragItem, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as {
          x: number;
          y: number;
        };

        let left = Math.round(item.left + delta.x);
        let top = Math.round(item.top + delta.y);

        moveBox(item.id, left, top);
        return undefined;
      },
    }),
    [moveBox]
  );

  return (
    <section>
      <div className="main__meme" ref={memeNode}>
        <img src={url} ref={drop} style={styles} alt="meme"></img>
        {Object.keys(boxes).map((key) => (
          <DraggableBox key={key} id={key} {...boxes[key]} />
        ))}
      </div>
      <div className="main__customize">
        <div className="all-memes">
          <MemesBox />
        </div>
        <div className="main__btns">
          <button
            className="btn-options"
            onClick={() => {
              actions.hideResize();
              toggle();
              domtoimage
                .toPng(memeNode.current)
                .then((imgUrl: string) => setImgUrl(imgUrl));
            }}
          >
            SAVE MEME
          </button>
          <Modal isShowing={isShowing} hide={toggle} imgUrl={imgUrl} />
          <button
            type="button"
            className="btn-options"
            onClick={() => {
              newBoxes(boxes);
            }}
          >
            ADD NEW TEXT FIELD
          </button>
        </div>
        <Customize />
        {Object.keys(boxes).map((key) => (
          <p className="main__text" key={key}>
            <span>Text field #{key}</span>
            {(+key as number) > 1 ? (
              <button className="btn-del" onClick={() => deleteArea(key)}>
                X
              </button>
            ) : (
              ""
            )}
          </p>
        ))}
      </div>
    </section>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
