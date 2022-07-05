import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { auth } from "../../features/auth/authSlice"
import "./Sign.css"

function SigninPage() {
  const dispatch = useDispatch()

  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const signinIn = useSelector((state) => state.auth.signinIn)

  const error = useSelector((state) => state.auth.error)

  const handleChangeLogin = (e) => {
    setLogin(e.target.value)
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = () => {
    if (login !== "" && password !== "") {
      dispatch(auth({ login, password }))

      setLogin("")
      setPassword("")
      setErrorMessage("")
    } else {
      setErrorMessage("Поле ввода не может быть пусты!")
    }
  }

  return (
    <div className="Wrapper">
      <div className="Sign">
        <div className="SignBlock">
          <h1>Todo</h1>
          <span className="Error">{error || errorMessage}</span>
          <div>
            <input
              type="text"
              placeholder="Логин"
              value={login}
              onChange={handleChangeLogin}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={handleChangePassword}
            />
          </div>
          <button disabled={signinIn} onClick={handleSubmit}>
            войти
          </button>
          <p>
            У вас ещё нет аккаунта? <Link to="/signup">Зарегистрироваться</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SigninPage
