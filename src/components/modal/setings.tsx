import { useState } from "react";
//@ts-ignore
import Modal from "react-modal";
import useEventListener from "../../hooks/event-listener";
import { BsX } from "react-icons/bs";
//@ts-ignore
import ToggleButton from 'react-toggle-button';
import { RootState, store } from "../../store";
import { useDispatch, useSelector } from "react-redux";

interface IConfig {
  open: boolean;
  onClose: () => void;
}

const Settings = ({ open, onClose }: IConfig) => {
  const dispatch = useDispatch();
  const [height, setHeight] = useState<number>(window.innerHeight - 250);
  useEventListener("resize", () => setHeight(window.innerHeight - 250));
  const { currentTheme: { darkMode, colors: { background, color } } } = useSelector<RootState, RootState["themeReducer"]>(
    (state) => state.themeReducer
  );

  const customStyles = {
    content: {
      maxWidth: 500,
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      top: 10,
      bottom: 10,
      backgroundColor: background,
      color: color,
    },
  };

  const onToggleTheme = () => {
    dispatch({ type: 'SET_DARK_MODE', payload: !darkMode })
  };

  return (
    <Modal
      isOpen={open}
      style={customStyles}
      contentLabel="Example Modal"
      shouldCloseOnOverlayClick={false}
      ariaHideApp={false}
    >
      <h2 style={{ margin: 0 }}>SETTINGS</h2>
      <BsX
        onClick={() => onClose()}
        size={35}
        style={{ position: "absolute", top: 5, right: 10, cursor: "pointer" }}
      />
      Dark mode <ToggleButton inactiveLabel={''} activeLabel={''} value={darkMode} onToggle={ () => onToggleTheme() } />
    </Modal>
  );
};

export default Settings;
