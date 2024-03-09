"use client"

import AuthContext from "../../../contexts/authContext";
import styles from "@/page.module.css";
import { useContext } from "react";
import { redirect } from "next/navigation";
import BottomBarButtons from "@/molecules/BottomBarButtons/BottomBarButtons";
import CompareRerun from "@/molecules/CompareRerun/CompareRerun";

export default function Home() {
    const { user } = useContext(AuthContext)
    return (
        <>
        {!user ? redirect('/login') : (
          <>
            <main className={styles.main}>
              MAIN PAGE
              <CompareRerun onParameterChange={() => {}}></CompareRerun>
              <BottomBarButtons />
            </main>
            
          </>
          )
          }
        </>
    )
}