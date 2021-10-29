import React from 'react'
import { Socket } from 'socket.io-client';
import Todo from '../Todo/Todo'

interface TodoListProps {
    todos: any,
    socket: Socket
}

const TodoList = ({ todos, socket }: TodoListProps) => {

    return (
        <>
            {/* <p>Filter</p>
            <button className="button">To do</button>
            <button className="button">Done</button> */}
            <ul className="flex flex-col m-5 pt-5 bg-white">
                {todos && todos.map((todo: Todo) => {
                return <Todo todo={todo} key={todo.todoId} socket={socket}/>
                })}
            </ul>
        </>
    )
}

export default TodoList
