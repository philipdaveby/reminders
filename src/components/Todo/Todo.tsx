import React, { useState } from 'react'

interface TodoProps {
    todo: Todo
}

const Todo = ({ todo }: TodoProps) => {

    const [completed, setCompleted] = useState(false);

    return (
        <div className="border rounded m-2">
            <p onClick={() => completed ? setCompleted(false) : setCompleted(true)} className={completed ? 'text-lightgray line-through' : ''}>{todo.task}</p>
        </div>
    )
}

export default Todo
