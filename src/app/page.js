import { AuthContextProvider } from "../../contexts/authContext";
import styles from "./page.module.css";
import { redirect } from 'next/navigation'

export default function Home() {

  return (
    <AuthContextProvider>
      <main className={styles.main}>
        
      </main>
    </AuthContextProvider>
  )
}
