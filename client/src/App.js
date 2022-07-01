import { Route, Routes } from "react-router-dom"
// import Input from "./components/Input/Input"
// import Todos from "./components/todos/Todos"
import "./App.css"
import { LinearProgress } from "@mui/material"
import { useSelector } from "react-redux"
import HomePage from "./components/pages/HomePage"
import SigninPage from "./components/pages/SigninPage"
import SignupPage from "./components/pages/SignupPage"

function App() {
  const loading = useSelector((state) => state.loading)

  return (
    <>
      {loading && <LinearProgress color="secondary" />}
      <div className="App">
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </div>
    </>
  )
}

export default App
