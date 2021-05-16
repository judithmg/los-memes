import { FC, useEffect } from "react";
import { getMemes, setMeme } from "../redux/actions";
import { connect } from "react-redux";
import { RootState } from "../redux/reducers";
import { bindActionCreators, Dispatch } from "redux";

interface Meme {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  box_count: number;
}

function mapStateToProps(state: RootState) {
  return {
    memes: state.memes,
    url: state.url,
  };
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(
    {
      getMemes,
      setMeme,
    },
    dispatch
  ),
});

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const MemesBox: FC<Props> = ({ actions, memes }: Props) => {
  useEffect(() => {
    if (!memes?.length) {
      actions.getMemes();
    }
  }, [actions, memes]);

  return (
    <div className="memes__container">
      {memes.length &&
        memes?.map((meme: Meme) => (
          <button
            key={meme.url}
            type="button"
            onClick={() => actions.setMeme(meme.url)}
          >
            <img className="memes__meme" src={meme.url} alt="meme"></img>
          </button>
        ))}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MemesBox);
