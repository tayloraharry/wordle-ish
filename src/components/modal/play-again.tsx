//@ts-ignore
import { useEffect, useState } from "react";
//@ts-ignore
import Modal from "react-modal";
//@ts-ignore
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { IWordState } from "../../reducers/word";
import { solved } from "../../word-banks/five";
import { RootState } from "../../store";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

interface IPlayAgain {
  open: boolean;
}

const PlayAgain = () => {
  const dispatch = useDispatch();
  const { submittedWords } = useSelector<RootState, RootState["wordReducer"]>(
    (state) => state.wordReducer
  );
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [isSolved, setIsSolved] = useState<boolean>(false);

  useEffect(() => {
    setIsSolved(false);
    if (
      submittedWords.length > 0 &&
      solved(submittedWords[submittedWords.length - 1].text)
    ) {
      setIsSolved(true);
      setIsOpen(true);
    } else if (submittedWords.length > 5) {
      setIsOpen(true);
    }
  }, [submittedWords]);

  return (
    <Modal
      isOpen={modalIsOpen}
      style={customStyles}
      contentLabel="Example Modal"
      shouldCloseOnOverlayClick={false}
      ariaHideApp={false}
    >
      {isSolved ? (
        <h2>Yay! You guessed the correct word.</h2>
      ) : (
        <h2>
          Sorry, the word was <i>"{Cookies.get("targetWord")}"</i>
        </h2>
      )}
      <button
        style={{ backgroundColor: "#6aaa64", color: "white", padding: 10 }}
        onClick={() => (setIsOpen(false), dispatch({ type: "START_NEW_GAME" }))}
      >
        Play Again?
      </button>
    </Modal>
  );
};

export default PlayAgain;
