import { Inter } from "next/font/google"
import "./globals.css"
import styles from "@/page.module.css"
import { AuthContextProvider } from "%/authContext"
import { DataProvider } from "%/DataContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Sparky",
  description: "A mobile web app for experimenting with Gemini"
}

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1, viewport-fit=cover"
      />
      <AuthContextProvider>
        <DataProvider>
          <body className={inter.className}>
            <main className={styles.main} id="mainContainer">
              <div className={styles.mobileContainer}>{children}</div>
            </main>
          </body>
        </DataProvider>
      </AuthContextProvider>
    </html>
  )
}
