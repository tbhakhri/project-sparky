"use client"

import AuthContext from "../../../contexts/authContext";
import styles from "../page.module.css";
import { useContext } from "react";
import { redirect } from "next/navigation";
import BottomBarButtons from "../BottomBarButtons";

export default function Home() {
    const { user } = useContext(AuthContext)
    return (
        <>
        {!user ? redirect('/login') : (
          <>
            <main className={styles.main}>
              MAIN PAGE
            </main>
            <BottomBarButtons />
          </>
          )
          }
        </>
    )
}