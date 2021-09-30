import React from 'react';
import todos from '../../todos.json';

interface AddTodoProps {
    todos: any,
    setTodos: any
}

const AddTodo = ({ todos, setTodos }: AddTodoProps) => {

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newTodo = {
                "id": Math.floor(Math.random()*10000),
                "task": e.currentTarget.task.value,
                "isComplete": false,
                "owner": "philip.daveby@gmail.com",
                "locked": false,
                "subtasks": []
        };
        
        e.currentTarget.task.value = '';
        
        setTodos([...todos, newTodo]);
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
