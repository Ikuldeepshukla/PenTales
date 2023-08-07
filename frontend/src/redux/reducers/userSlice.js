import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PenTalesApi from "../../api/PenTales";
import { USER_SIGNIN, USER_SIGNUP, USER_LOGOUT } from "../../api/endpoints";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
};

export const signinUser = createAsyncThunk(
  "user/signin",
  async ({ email, password }) => {
    const response = await PenTalesApi.post(USER_SIGNIN, { email, password });
    return response.data;
  }
);

export const signupUser = createAsyncThunk(
  "user/signup",
  async ({ name, email, password }) => {
    const response = await PenTalesApi.post(USER_SIGNUP, {
      name,
      email,
      password,
    });
    return response.data;
  }
);

export const signoutUser = createAsyncThunk("user/logout", async () => {
  const response = await PenTalesApi.get(USER_LOGOUT);
  return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signinUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.error = null;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(signinUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.error = null;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(signoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.error = null;
        localStorage.removeItem("user");
      })
      .addCase(signoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
