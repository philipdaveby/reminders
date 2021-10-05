import React, { useState } from 'react'
import firebase from 'firebase'

interface TodoProps {
    todo: Todo
}

const Todo = ({ todo }: TodoProps) => {

    const [completed, setCompleted] = useState(todo.isComplete);

    const completeTodo = async (e: React.FormEvent<HTMLParagraphElement>) => {

        const id = e.currentTarget.id;
        await firebase.auth().currentUser?.getIdToken(true)
            .then(async idToken => {
        await fetch(`http://localhost:8000/api/todo/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': idToken
            },
            body: JSON.stringify({
                isComplete: !completed
            })
        })
        .catch(error => console.log(error.message));
    })
        completed ? setCompleted(false) : setCompleted(true);
    }

    const deleteTodo = async (e: React.FormEvent<HTMLButtonElement>) => {
        const id = e.currentTarget.id;
        await firebase.auth().currentUser?.getIdToken(true)
            .then(async idToken => {
                await fetch(`http://localhost:8000/api/todo/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': idToken
                    }
                });
            }).catch(error => console.log(error.message))
    }

    return (
        <div className="border rounded m-2">
            <p id={todo.todoId.toString()} onClick={e => completeTodo(e)} className={completed ? 'text-lightgray line-through' : ''}>{todo.task}</p>
            <button id={todo.todoId.toString()} onClick={e => deleteTodo(e)}>Delete</button>
        </div>
    )
}

export default Todo
