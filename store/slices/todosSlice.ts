import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async (userId: number) => {
    const response = await fetch(`https://reqres.in/api/users/${userId}`)
    return (await response.json());
  }
)


