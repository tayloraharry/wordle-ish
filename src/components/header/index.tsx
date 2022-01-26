import "./header.css";
import {
  IoHelpCircleOutline,
  IoSettingsOutline,
  IoStatsChartSharp,
  IoBugOutline,
} from "react-icons/io5";
import Settings from "../modal/setings";
import { useState } from "react";
const icon_size = 20;

const Header = () => {
  const [settingsOpen, setSettingOpen] = useState<boolean>(false);
  return (
    <header>
      <div className="menu">
        <IoHelpCircleOutline
          onClick={() => alert("coming soon!")}
          className="icon"
          size={icon_size}
          style={{marginLeft:10}}
        />
      </div>
      <div className="title">Wordle-<i style={{textTransform:'lowercase'}}>ish</i></div>
      <div className="menu">
        <IoStatsChartSharp
          onClick={() => alert("coming soon!")}
          className="icon"
          size={icon_size}
          style={{ marginRight: 10}}
        />
        <IoSettingsOutline
          onClick={() => setSettingOpen(true)}
          className="icon"
          size={icon_size}
          style={{ marginRight: 10}}
        />
        <Settings open={settingsOpen} onClose={() => setSettingOpen(false)}/>
      </div>
    </header>
  );
};

export default Header;
