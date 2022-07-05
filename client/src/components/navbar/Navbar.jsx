import React from "react"
import { useDispatch } from "react-redux"
import { removeToken } from "../../features/auth/authSlice"
import styles from "./Navbars.module.css"

function Navbar() {
  const dispatch = useDispatch()

  const logOut = () => {
    dispatch(removeToken())
  }

  return (
    <div className={styles.Navbar}>
      <nav>
        <ul>
          <li>
            <span onClick={logOut}>Log out</span>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
