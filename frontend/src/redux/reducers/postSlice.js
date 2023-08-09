import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PenTalesApi from "../../api/PenTales";
import { ADD_POST, GET_POST, DELETE_POST } from "../../api/endpoints";
import { toast } from "react-toastify";

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

export const getPosts = createAsyncThunk("posts/get", async () => {
  const response = await PenTalesApi.get(GET_POST);
  return response.data;
});

export const addPost = createAsyncThunk("posts/add", async (post) => {
  const response = await PenTalesApi.post(ADD_POST, post);
  return response.data;
});

export const deletePost = createAsyncThunk("posts/delete", async (postId) => {
  const response = await PenTalesApi.delete(`${DELETE_POST}/${postId}`);
  return response.data;
});

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.data;
        state.error = null;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.data;
        state.error = null;
        toast("Post added successfully");
      })
      .addCase(addPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.error = null;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default postSlice.reducer;
