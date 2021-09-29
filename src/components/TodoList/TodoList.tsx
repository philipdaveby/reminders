import React from 'react'
import Todo from '../Todo/Todo'
import todos from '../../todos.json';

const TodoList = () => {

    return (
        <div>
            Todo Lists
            {todos.map(todo => {
            return <Todo todo={todo}/>
            })}
        </div>
    )
}

export default TodoList
