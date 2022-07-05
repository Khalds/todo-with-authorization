import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
  todos: [],
  error: null,
  loading: false,
  process: false,
}

export const fetchTodos = createAsyncThunk(
  "todo/fetch",
  async (_, thunkAPI) => {
    const userId = localStorage.getItem("userId")
    const state = thunkAPI.getState()
    try {
      const res = await fetch(`http://localhost:3001/todo/${userId}`, {
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
        },
      })

      const json = await res.json()

      if (json.error) {
        return thunkAPI.rejectWithValue(json.error)
      } else {
        return thunkAPI.fulfillWithValue(json)
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export const postTodo = createAsyncThunk(
  "todo/post",
  async (text, thunkAPI) => {
    const state = thunkAPI.getState()
    try {
      const res = await fetch("http://localhost:3001/todo", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ text }),
      })
      return await res.json()
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export const removeTodo = createAsyncThunk(
  "todo/remove",
  async (id, thunkAPI) => {
    const state = thunkAPI.getState()
    try {
      await fetch(`http://localhost:3001/todo/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
        },
      })

      return id
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export const chekedTodo = createAsyncThunk(
  "todo/patch",
  async (todo, thunkAPI) => {
    const state = thunkAPI.getState()
    try {
      const res = await fetch(`http://localhost:3001/todo/${todo._id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !todo.completed,
        }),
      })
      return res.json()
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload
        state.loading = false
      })
      .addCase(fetchTodos.pending, (state, action) => {
        state.loading = true
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false
        state.error = "При запросе на сервер произошла ошибка"
      })
      .addCase(postTodo.fulfilled, (state, action) => {
        state.todos.unshift(action.payload)
        state.process = false
      })
      .addCase(postTodo.pending, (state, action) => {
        state.process = true
      })
      .addCase(postTodo.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.process = false
        state.todos = state.todos.filter((todo) => {
          return (
            todo._id !== action.payload ||
            localStorage.getItem("userId") !== todo.user
          )
        })
      })
      .addCase(removeTodo.pending, (state, action) => {
        state.process = true
      })
      .addCase(removeTodo.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(chekedTodo.fulfilled, (state, action) => {
        state.process = false

        state.todos = state.todos.map((todo) => {
          if (
            todo._id === action.payload._id &&
            localStorage.getItem("userId") === todo.user
          ) {
            return action.payload
          }
          return todo
        })
      })
  },
})

export default todoSlice.reducer
