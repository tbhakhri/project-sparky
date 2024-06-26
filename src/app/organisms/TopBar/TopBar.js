import AuthContext from "%/authContext"
import { useContext } from "react"
import Image from "next/image"
import "./TopBar.css"
import { useData } from "%/DataContext"
import { useRouter } from "next/navigation"

export default function TopBar({ toggleSidebar }) {
  const { logout } = useContext(AuthContext)
  const { errorMessage, closeErrorBox } = useData()
  
  const router = useRouter()

  const handleAPIKey = () => {
    router.push('/apikey')
  }
  return (
    <div className="topBarContainer">
      <button className="historyButton" onClick={toggleSidebar}>
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
      <button className="apiKeyButton">
        
        <Image
          src="/key.svg"
          alt="apikeyButton"
          width={20}
          height={20}
          onClick={handleAPIKey}
        />
      </button>
      {errorMessage !== "" && (
        <div className="error" onClick={closeErrorBox}>
          <b>Oops! Ran into an error. Click to dismiss this box.</b>
          <br />
          {errorMessage}
        </div>
      )}
      
    </div>
  )
}
