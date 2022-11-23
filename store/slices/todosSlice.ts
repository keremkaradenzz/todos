import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ITodos, ITodosState} from "../../types/ITodos";
import {todosUrl} from "../../constants/apiUrlConstants";

const initialState: ITodosState = {
  data: [],
  loading: false,
}

export const getTodos = createAsyncThunk(
  "getTodos",
  async (page, limit) => {
    const response = await fetch(`${todosUrl.getTodos}?_page=${page}&_limit=${limit}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    return (await response.json()) as ITodos[];
  }
);

export const postTodos = createAsyncThunk(
  "postTodos",
  async (data) => {
    const response = await fetch(`${todosUrl.getTodos}`, {
      method: "POST",
      headers: {
        Accept: "applicatiopn/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    console.log('response', response)
    return (await response.json()) as ITodos;
  }
);


export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTodos.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getTodos.fulfilled, (state, action: PayloadAction<ITodos[]>) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(postTodos.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(postTodos.fulfilled, (state, action: PayloadAction<ITodos>) => {
      state.loading = false;
      if (state.data)
        state.data = [...state?.data, action.payload];
      else
        state.data = [action.payload];
    });
  }
});

export default todosSlice.reducer;