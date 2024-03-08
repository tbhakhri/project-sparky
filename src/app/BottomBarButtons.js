import './BottomBarButtons.css';
import Image from 'next/image';

export default function BottomBarButtons() {
    return (
      <div className="bottombarButtonsContainer">
        <div className="bottombarButtonsTop">
            <button className="bottombarButton" style={{ width: "65%" }}>
                <Image className="bottombarButtonImg" src={require("./put-button.svg")} alt="Config Params" 
                width={10} height={10}
                style={{ marginRight: "5px" }} />
                <span>Put</span>
            </button>
            <button className="bottombarSettingsButton">
                <Image className="bottombarButtonImg" src={require("./setting-lines.svg")} alt="Config Params" width={15} height={15} />
            </button>
        </div>
        <button className="bottombarButton" style={{ width: "100%" }}>
            <Image className="bottombarButtonImg" src={require("./run.svg")} alt="Config Params"
            width={10} height={10}
            style={{ marginRight: "7px" }} />
            <span>Run</span>
        </button>
      </div>
    )
  }