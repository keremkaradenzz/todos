import {configureStore} from '@reduxjs/toolkit'
import {
  useDispatch,
  useSelector,
  TypedUseSelectorHook
} from "react-redux";
import todosSlice from "./slices/todosSlice";

// @ts-ignore
export const store = configureStore({
  reducer: {
    todos: todosSlice,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector