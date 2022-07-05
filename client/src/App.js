import { Route, Routes, Navigate } from "react-router-dom"
import "./App.css"
import { LinearProgress } from "@mui/material"
import { useSelector } from "react-redux"
import HomePage from "./components/pages/HomePage"
import SigninPage from "./components/pages/SigninPage"
import SignupPage from "./components/pages/SignupPage"

function App() {
  const loading = useSelector((state) => state.loading)
  const token = useSelector((state) => state.auth.token)

  if (!token) {
    return (
      <div className="App">
        <Routes>
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<Navigate replace to="/signin" />} />
        </Routes>
      </div>
    )
  }

  return (
    <>
      {loading && <LinearProgress color="secondary" />}
      <div className="App">
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </div>
    </>
  )
}

export default App
