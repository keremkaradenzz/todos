import React, {useEffect, useState} from "react";
import {Container} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../store";
import {getTodos, postTodos} from "../store/slices/todosSlice";
import Loading from "../components/Loading/Loading";
import {ITodosState, ITodos} from "../types/ITodos";


const DEFAULT_LIMIT = 20;

const defaultState: ITodos = {completed: false, id: Math.random(), title: "", userId: 2}

export default function Home() {
  const [page, setPage] = useState<number>(1);
  const dispatch = useAppDispatch()
  const [values, setValues] = useState<ITodos>(defaultState);

  const todos: ITodosState = useAppSelector(state => state.todos);
  useEffect(() => {
    // @ts-ignore
    dispatch(getTodos((page ?? 1), DEFAULT_LIMIT))
  }, [page])

  const handleBack = () => {
    if (page > 1) {
      setPage(prevState => prevState - 1)
    }
  }
  const handleNext = () => {
    setPage(prevState => prevState + 1)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'completed') {
      setValues(prevState => ({...prevState, [e.target.name]: e.target.checked}));
    } else {
      setValues(prevState => ({...prevState, [e.target.name]: e.target.value}));
    }

  }

  const handleSend = () => {
    // @ts-ignore
    dispatch(postTodos(values));
  }

  return (
    <main>
      <Container>
        {todos?.loading && <Loading/>}
        {todos.data && todos.data.map((todo: ITodos, index: number) =>
          <div key={index}>
            {todo.title}
          </div>)}
        <div style={{margin: 10}}>
          <span>Sayfa : {page}</span>
        </div>
        <div>
          <button onClick={handleBack}>Geri</button>
          <button onClick={handleNext}>Ileri</button>
        </div>


        <div style={{marginTop: 20}}>
          <label htmlFor='title'>Title</label>
          <input id='title' name='title' onChange={handleChange}/>
          <label htmlFor='completed'>Is Completed ? </label>
          <input type='checkbox' name='completed' id='completed' onChange={handleChange}/>
          <button onClick={handleSend}>Send</button>
        </div>
      </Container>
    </main>
  )
}
