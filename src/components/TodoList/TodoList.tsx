import React from 'react'
import Todo from '../Todo/Todo'

interface TodoListProps {
    todos: any
}

const TodoList = ({ todos }: TodoListProps) => {

    return (
        <div className="border rounded m-5 p-1">
            Todo List
            {todos ? todos.map((todo: Todo) => {
            return <Todo todo={todo} key={todo.todoId}/>
            }) : ''}
        </div>
    )
}

export default TodoList
