import React from 'react';
import firebase from 'firebase/app'
import { Socket } from 'socket.io-client'

interface AddTodoProps {
    todos: any,
    setTodos: any,
    setNewTodos: any,
    socket: Socket
}

const AddTodo = ({ todos, setTodos, setNewTodos, socket }: AddTodoProps) => {

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const task = e.currentTarget.task.value;

        socket.emit('add-todo')

        await firebase.auth().currentUser?.getIdToken(true)
            .then(async idToken => {
        await fetch(`http://localhost:8000/api/todo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': idToken
            },
                    body: JSON.stringify({
                        task
                    })
                })
                // .then(() => e.currentTarget.task.value = '')
                .catch(err => console.log('1' + err));
        }).catch(error => console.log('2' + error.message));

        setNewTodos(true)
        // e.currentTarget.task.value = '';
    }

    return (
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                <input type="text" name="task" placeholder="Name your todo.." className="rounded" />
                <button type="submit" className="ml-2 p-2 border rounded">Add Todo</button>
            </form>
        </div>
    )
}

export default AddTodo
