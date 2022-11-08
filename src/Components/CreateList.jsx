import { useState, useEffect, useRef } from 'react'
import { nanoid } from "nanoid"
import TodoList from "./TodoList";

export default function CreateLists() {
    console.log("createlist");
    const todoRef = useRef('');
    const [todoArr, setTodoArr] = useState(() => JSON.parse(localStorage.getItem("todo")) || [])
    const [emptyInput, setEmptyInput] = useState(true)

    useEffect(() => {
        localStorage.setItem("todo", JSON.stringify(todoArr))
        todoRef.current.focus();
    }, [todoArr])

    function showTodo() {
        setEmptyInput(true)
        const todoList = {
            id: nanoid(),
            todo: todoRef.current.value,
            isCompleted: false
        }
        setTodoArr(prevTodoArr => [todoList, ...prevTodoArr])
        todoRef.current.value = ""
    }

    function change() {
        (todoRef.current.value.length) ? setEmptyInput(false) : setEmptyInput(true)
    }

    return (
        <div className='container'>
            <h1>What's the plan for Today? 🤔</h1>
            <div className='input-container'>
                <input ref={todoRef} type="text" className="todo-input" onChange={change} placeholder="Enter Todo For Today" />
                <button className='add-todo-btn' disabled={emptyInput} type='submit' onClick={showTodo}>Add Todo 👍</button>
            </div>
            <TodoList setTodoItems={setTodoArr} todoItems={todoArr} />
        </div>
    )
}




