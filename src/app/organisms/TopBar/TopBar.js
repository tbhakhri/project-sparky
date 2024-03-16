import AuthContext from "../../../../contexts/authContext"
import { useContext } from "react"
import Image from "next/image"
import "./TopBar.css"

export default function TopBar() {
  const { logout } = useContext(AuthContext)
  return (
    <div className="topBarContainer">
      <button className="historyButton">
        <Image
          src="/history-button.svg"
          alt="historyButton"
          width={20}
          height={20}
        />
      </button>
      <button className="logoutButton">
        <Image
          src="/logout.svg"
          alt="logoutButton"
          width={20}
          height={20}
          onClick={() => logout()}
        />
      </button>
      <Image src="/sparkyLogo.svg" alt="sparky logo" width={115} height={50} />
    </div>
  )
}
