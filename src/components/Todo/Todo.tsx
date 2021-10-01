import React, { useState } from 'react'

interface TodoProps {
    todo: Todo
}

const Todo = ({ todo }: TodoProps) => {

    const [completed, setCompleted] = useState(todo.isComplete);

    const completeTodo = async (e: React.FormEvent<HTMLParagraphElement>) => {

        const id = e.currentTarget.id;
        await fetch(`http://localhost:8000/api/todo/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                isComplete: !completed
            })
        });
        completed ? setCompleted(false) : setCompleted(true);
    }

    const deleteTodo = async (e: React.FormEvent<HTMLButtonElement>) => {
        const id = e.currentTarget.id;
        await fetch(`http://localhost:8000/api/todo/${id}`, {
            method: 'DELETE'
        });
    }

    return (
        <div className="border rounded m-2">
            <p id={todo.todoId.toString()} onClick={e => completeTodo(e)} className={completed ? 'text-lightgray line-through' : ''}>{todo.task}</p>
            <button id={todo.todoId.toString()} onClick={e => deleteTodo(e)}>Delete</button>
        </div>
    )
}

export default Todo
