import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createUser } from "../../features/auth/authSlice"

function SignupPage() {
  const dispatch = useDispatch()

  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")

  const signinUp = useSelector((state) => state.auth.signinUp)

  const error = useSelector((state) => state.auth.error)

  const handleChangeLogin = (e) => {
    setLogin(e.target.value)
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = () => {
    dispatch(createUser({ login, password }))
  }

  return (
    <div>
      {error}
      <div>
        <input
          type="text"
          placeholder="type login"
          value={login}
          onChange={handleChangeLogin}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="type password"
          value={password}
          onChange={handleChangePassword}
        />
      </div>
      <button disabled={signinUp} onClick={handleSubmit}>
        регистрация
      </button>
    </div>
  )
}

export default SignupPage
