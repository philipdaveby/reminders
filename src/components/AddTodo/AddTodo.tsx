import React from 'react';
// import todos from '../../todos.json';

interface AddTodoProps {
    todos: any,
    setTodos: any
}

const AddTodo = ({ todos, setTodos }: AddTodoProps) => {

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await fetch('http://localhost:8000/api/todo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                task: e.currentTarget.task.value
            })
        })
        // .then(() => e.currentTarget.task.value = '')
        .catch(err => console.log(err));

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
