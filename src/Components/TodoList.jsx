import DeleteTodo from "./DeleteTodo"
import EditTodo from "./EditTodo"
import Checkbox from "./Checkbox";
import { useState, memo } from "react"

export default memo(function TodoList({ setTodoItems, todoItems }) {
    console.log("todolist");
    const [todoEditing, setTodoEditing] = useState(null);

    const handleSubmit = (event, id) => {
        // event.preventDefault()
        const form = event.currentTarget;
        const nameInput = form.elements["todo"]
        const nameInputValue = nameInput.value
        setTodoItems(prevItems =>
            prevItems.map(item => {
                if(id === item.id) {
                    return {
                        ...item,
                        todo : nameInputValue
                    }
                }
                else return item
            })
        )
        setTodoEditing(null)
    }

    return (
        <div className="all-todo-items">
            <h2>Items in my todo 🗒️</h2>
            {
                todoItems.map(item => {
                    return (
                        <div className="single-todo-item" key={item.id}>
                            <Checkbox isCompleted={item.isCompleted} itemId={item.id} setTodoItems={setTodoItems} todoItems={todoItems} />

                            {
                                todoEditing === item.id ?
                                    <form onSubmit={(event) => handleSubmit(event, item.id)}>
                                        <input type={todoEditing ? "text" : 'hidden'} name='todo' defaultValue={item.todo}/>
                                        <button type="submit">Update</button>
                                        <button onClick={() => setTodoEditing(null)}>Cancel</button>
                                    </form> :
                                    !item.isCompleted
                                        ? <div>{item.todo}</div>
                                        : <s>{item.todo}</s>
                            }

                            <EditTodo setTodoEditing={() => setTodoEditing(item.id)} />
                            <DeleteTodo setTodoItems={setTodoItems} id={item.id} />
                        </div>
                    )
                })
            }

        </div>
    )
})