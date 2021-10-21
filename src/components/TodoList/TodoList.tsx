import React from 'react'
import { Socket } from 'socket.io-client';
import Todo from '../Todo/Todo'

interface TodoListProps {
    todos: any,
    socket: Socket
}

const TodoList = ({ todos, socket }: TodoListProps) => {

    return (
            <ul className="flex flex-col border border-blue-900 rounded-lg mt-5 mb-5 m-5 pt-5 pb-5 bg-white">
                {todos && todos.map((todo: Todo) => {
                return <Todo todo={todo} key={todo.todoId} socket={socket}/>
                })}
            </ul>
    )
}

export default TodoList
