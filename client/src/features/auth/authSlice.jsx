import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
  signinUp: false,
  error: null,
  token: null,
}

export const createUser = createAsyncThunk(
  "user/post",
  async ({ login, password }, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
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

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.fulfilled, (state, action) => {
        state.signinUp = false
      })
      .addCase(createUser.pending, (state, action) => {
        state.signinUp = true
        state.error = null
      })
      .addCase(createUser.rejected, (state, action) => {
        state.signinUp = false
        state.error = action.payload
      })
  },
})

export default authSlice.reducer
