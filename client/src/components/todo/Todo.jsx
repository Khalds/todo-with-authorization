import React from "react"
import { useDispatch } from "react-redux"
import { chekedTodo, removeTodo } from "../../features/todos/todoSlice"
import styles from "./Todo.module.css"

function Todo({ todo }) {
  const dispatch = useDispatch()

  const handleRemoveTodo = (id) => {
    dispatch(removeTodo(id))
  }
  const handleChekedTodo = () => {
    dispatch(chekedTodo(todo))
  }
  return (
    <>
      <div className={styles.todo}>
        <div className={styles.completed}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleChekedTodo}
          ></input>
        </div>
        <div className={styles.todoText}>{todo.text}</div>
        <div className={styles.todoAction}>
          <button onClick={() => handleRemoveTodo(todo._id)}>✘</button>
        </div>
      </div>
    </>
  )
}

export default Todo
