import React, { useState, useEffect } from 'react'
import { Socket } from 'socket.io-client';
import Todo from '../Todo/Todo'

interface TodoListProps {
    todos: Array<Todo> | null,
    getTodos: any,
    socket: Socket,
    filtered: boolean
}

const TodoList = ({ todos, socket, getTodos, filtered }: TodoListProps) => {

    const [filteredTodos, setFilteredTodos] = useState<Array<Todo> | null>(todos);


    useEffect(() => {
        filterTodos()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filtered, getTodos])

    const filterTodos = () => {
        if (filtered) {
            const newTodos = todos?.filter(todo => todo.isComplete === true);
            newTodos && setFilteredTodos(newTodos)
        } 
        if (!filtered) {
            setFilteredTodos(todos)
        }
    }

    return (
        <div className='max-w-2xl m-auto mt-4 z-0'>  
            {filtered && <h2 className='text-2xl mt-4 font-roboto border-b-2'>Done todos</h2>}
            {filtered ? <ul className="flex flex-col pt-5 pb-16 bg-white m-auto">
                {filteredTodos && filteredTodos.map((todo: Todo) => {
                return <Todo getTodos={getTodos} todo={todo} key={todo.todoId} socket={socket}/>
                })}
            </ul> 
            :
            <ul className="flex flex-col pb-16 bg-white m-auto z-0">
                {todos && todos.map((todo: Todo) => {
                return <Todo getTodos={getTodos} todo={todo} key={todo.todoId} socket={socket}/>
                })}
            </ul>}
        </div>
    )
}

export default TodoList
