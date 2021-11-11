import React, { useState, useEffect } from 'react'
import { Socket } from 'socket.io-client';
import Todo from '../Todo/Todo'
import filterIcon from '../../icons/filter.png'

interface TodoListProps {
    todos: Array<Todo> | null,
    setTodos: any,
    getTodos: any,
    socket: Socket
}

const TodoList = ({ todos, socket, setTodos, getTodos }: TodoListProps) => {

    const [filteredTodos, setFilteredTodos] = useState<Array<Todo> | null>(todos);
    const [filtered, setFiltered] = useState<boolean>(false);

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
        <>  
            <div className='w-full flex justify-end pr-10'>
                <button onClick={() => setFiltered(!filtered)} className=''><img className={filtered ? 'w-14 transform rotate-90 border-2 rounded-full' : 'w-14 transform rotate-90'} src={filterIcon} alt='Filter your todos'/></button>
            </div>
            {!filtered ? <ul className="flex flex-col pb-16 bg-white m-auto overscroll-auto">
                {todos && todos.map((todo: Todo) => {
                return <Todo getTodos={getTodos} setTodos={setTodos} todo={todo} key={todo.todoId} socket={socket}/>
                })}
            </ul>
            :
            <ul className="flex flex-col pt-5 pb-16 bg-white m-auto overscroll-auto">
                {filteredTodos && filteredTodos.map((todo: Todo) => {
                return <Todo getTodos={getTodos} setTodos={setTodos} todo={todo} key={todo.todoId} socket={socket}/>
                })}
            </ul>}
        </>
    )
}

export default TodoList
