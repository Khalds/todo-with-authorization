import React from "react"
import Input from "../Input/Input"
import Navbar from "../navbar/Navbar"
import Todos from "../todos/Todos"
import "./Sign.css"

function HomePage() {
  return (
    <div className="Homepage">
      <Navbar />
      <div className="HomeCenter">
        <Input />
        <Todos />
      </div>
    </div>
  )
}

export default HomePage
