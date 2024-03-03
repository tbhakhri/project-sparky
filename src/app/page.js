import { AuthContextProvider } from "../../contexts/authContext";
import Home from "./Home/home";

export default function App() {
  return (
    <AuthContextProvider>
      <Home />
    </AuthContextProvider>
  )
}
