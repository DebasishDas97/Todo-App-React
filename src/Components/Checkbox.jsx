export default function Checkbox({todoItems, setTodoItems, isCompleted, itemId}) {

    function checkCompleted(id, event) {
        console.log("checkbox");
        const { name, checked } = event.target
        const item = todoItems.splice(todoItems.findIndex(item => item.id === id), 1)[0]
        const newItem = {
            ...item,
            [name]: checked
        }
        setTodoItems(prevTodoItems => [...prevTodoItems, newItem])
    }
    return (
        <input type="checkbox" id="isCompleted" checked={isCompleted} onChange={(event) => checkCompleted(itemId, event)} name="isCompleted" />
    )
}
