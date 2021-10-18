import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Socket } from 'socket.io-client'

interface AddTodoProps {
    todos: any,
    setTodos: any,
    socket: Socket
}

const AddTodo = ({ todos, setTodos, socket }: AddTodoProps) => {

    const user = useContext(AuthContext);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const task = e.currentTarget.task.value;

        
        await user?.getIdToken(true)
        .then(async idToken => {
            await fetch(`http://localhost:8000/api/todo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': idToken
                },
                body: JSON.stringify({task})
            })
            // .then(() => e.currentTarget.task.value = '')
            .catch(err => console.log('1' + err));
        }).catch(error => console.log('2' + error.message));
        
        socket.emit('add-todo')
        // setNewTodos(true)
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
