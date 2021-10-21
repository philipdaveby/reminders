import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Socket } from 'socket.io-client'
import config from '../../utils/config';

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
        e.currentTarget.task.value = ''
        await user?.getIdToken(true)
            .then(async idToken => {
                await fetch(`${config.backend_url}/api/todos`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': idToken
                    },
                    body: JSON.stringify({task})
                }).catch(err => console.log('1' + err));
            
        })
        .catch(error => console.log('2' + error.message));
        
        socket.emit('add-todo')
    }

    return (
        <div className="mb-4">
            <form onSubmit={e => handleSubmit(e)}>
                <input type="text" name="task" placeholder="Enter you todo..." className="rounded" />
                <button type="submit" className="button">Add Todo</button>
            </form>
        </div>
    )
}

export default AddTodo
