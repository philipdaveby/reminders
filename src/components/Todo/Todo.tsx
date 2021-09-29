import React, { useState } from 'react'

interface TodoProps {
    todo: {
        task: string,
        isComplete: boolean
    }
}

const Todo = ({ todo }: TodoProps) => {

    const [completed, setCompleted] = useState(false);

    return (
        <div onClick={() => completed ? setCompleted(false) : setCompleted(true)} className={completed ? 'line-through' : ''}>
            <p>{todo.task}</p>
            <p>{todo.isComplete}</p>
        </div>
    )
}

export default Todo
