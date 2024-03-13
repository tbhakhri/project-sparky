import styles from "@/page.module.css";
import './PutRunSettings.css';
import Image from 'next/image';

export default function PutRunSettings() {
    return (
      <div className="bottombarButtonsContainer">
        <div className="bottombarButtonsTop">
            <button className={styles.putruniconButton} style={{ width: "65%" }}>
                <Image src="/put.svg" alt="Put" 
                width={10} height={10}
                style={{ marginRight: "5px" }} />
                <span>Put</span>
            </button>
            <button className="bottombarSettingsButton">
                <Image src="/setting-lines.svg" alt="Config Params" width={15} height={15} />
            </button>
        </div>
        <button className={styles.putruniconButton} style={{ width: "100%" }}>
            <Image src="/run.svg" alt="Run"
            width={10} height={10}
            style={{ marginRight: "7px" }} />
            <span>Run</span>
        </button>
      </div>
    )
  }