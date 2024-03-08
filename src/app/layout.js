import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sparky",
  description: "A mobile web app for experimenting with Gemini",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#282828" }} className={inter.className}>{children}</body>
    </html>
  );
}
