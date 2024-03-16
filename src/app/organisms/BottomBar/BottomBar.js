import BottomInputBox from "../../molecules/BottomInputBox/BottomInputBox"
import "./BottomBar.css"
import styles from "@/page.module.css"
import Image from "next/image"
import { useData } from "%/DataContext"

export default function BottomBar() {
  const {
    textEmpty,
    imageEmpty,
    addUserText,
    addResponseText,
    addImages,
    clearCurrText,
    clearCurrImages,
    readyToGenerate
  } = useData()

  const handlePutButton = (e) => {
    if (!textEmpty()) {
      addUserText()
      clearCurrText()
    }
    if (!imageEmpty()) {
      addImages()
      clearCurrImages()
    }
  }

  const handleRunButton = (e) => {
    if (!textEmpty()) {
      addUserText()
      clearCurrText()
    }
    if (!imageEmpty()) {
      addImages()
      clearCurrImages()
    }
    if (readyToGenerate()) {
      addResponseText()
    }
  }

  return (
    <div className="bottom_bar_container">
      <div className="text_box_container">
        <BottomInputBox />
      </div>

      <div className="bottombarButtonsContainer">
        <div className="bottombarButtonsTop">
          <button
            className={styles.putruniconButton}
            onClick={handlePutButton}
            style={{ width: "65%" }}
          >
            <Image
              src="/put.svg"
              alt="Put"
              width={10}
              height={10}
              style={{ marginRight: "5px" }}
            />
            <span>Put</span>
          </button>
        </div>

        <button
          className={styles.putruniconButton}
          onClick={handleRunButton}
          style={{ width: "100%" }}
        >
          <Image
            src="/run.svg"
            alt="Run"
            width={10}
            height={10}
            style={{ marginRight: "7px" }}
          />
          <span>Run</span>
        </button>
      </div>
    </div>
  )
}
