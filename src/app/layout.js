import { Inter } from "next/font/google"
import "./globals.css"
import styles from "@/page.module.css"
import { AuthContextProvider } from "%/authContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Sparky",
  description: "A mobile web app for experimenting with Gemini"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <meta name="viewport" content="viewport-fit=cover" />
      <AuthContextProvider>
        <body className={inter.className}>
          <main className={styles.main} id="mainContainer">
            <div className={styles.mobileContainer}>{children}</div>
          </main>
        </body>
      </AuthContextProvider>
    </html>
  )
}
