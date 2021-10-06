import React, { useState } from 'react'
import Todo from '../Todo/Todo'

interface TodoListProps {
    todos: any
}

const TodoList = ({ todos }: TodoListProps) => {

    const [edit, setEdit] = useState<boolean>(false);

    return (
        <div className="border rounded m-5 p-1">
            <h2>Todo List</h2>
            <p onClick={() => edit ? setEdit(false) : setEdit(true)}>Edit</p>
            {todos ? todos.map((todo: Todo) => {
            return <Todo todo={todo} key={todo.todoId} edit={edit}/>
            }) : ''}
        </div>
    )
}

export default TodoList
