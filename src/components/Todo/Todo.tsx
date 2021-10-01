import React, { useState } from 'react'

interface TodoProps {
    todo: Todo
}

const Todo = ({ todo }: TodoProps) => {

    const [completed, setCompleted] = useState(false);

    const deleteTodo = async (e: React.FormEvent<HTMLButtonElement>) => {
        const id = e.currentTarget.id;
        console.log(id)
        await fetch(`http://localhost:8000/api/todo/${id}`, {
            method: 'DELETE'
        });
    }

    return (
        <div className="border rounded m-2">
            <p onClick={() => completed ? setCompleted(false) : setCompleted(true)} className={completed ? 'text-lightgray line-through' : ''}>{todo.task}</p>
            <button id={todo.todoId.toString()} onClick={e => deleteTodo(e)}>Delete</button>
        </div>
    )
}

export default Todo
