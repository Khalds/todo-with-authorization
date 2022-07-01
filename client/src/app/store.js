import { configureStore } from "@reduxjs/toolkit"
import todoReducer from "../features/todos/todoSlice"
import authReducer from "../features/auth/authSlice"

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    auth: authReducer,
  },
})
