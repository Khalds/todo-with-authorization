import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { postTodo } from "../../features/todos/todoSlice"
import styles from "./Input.module.css"

function Input() {
  const [text, setText] = useState("")
  
  const user = useSelector((state) => state.auth.login)

  const dispatch = useDispatch()

  const addTodo = (text) => {
    if (text) {
      dispatch(postTodo(text))
      setText("")
    }
  }

  return (
    <div className={styles.Input}>
      <h1>Todo List: {user}</h1>
      <div className={styles.formTodo}>
        <input
          className={styles.inputTodo}
          type="text"
          placeholder="Type todo..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className={styles.addTodoButton}
          type="button"
          onClick={() => addTodo(text)}
        >
          Add
        </button>
      </div>
    </div>
  )
}

export default Input
