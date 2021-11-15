import React, { useState, useEffect } from 'react'
import { Socket } from 'socket.io-client';
import Todo from '../Todo/Todo'
import filterIcon from '../../icons/filter.png'
import addIcon from '../../icons/add1.png'

interface TodoListProps {
    todos: Array<Todo> | null,
    setTodos: any,
    getTodos: any,
    socket: Socket,
    setAddInput: any
}

const TodoList = ({ todos, socket, setTodos, getTodos, setAddInput }: TodoListProps) => {

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
        <div className='max-w-2xl m-auto'>  
            <div className='w-full flex justify-end pr-10'>
                {todos && todos[0] && <button onClick={() => setFiltered(!filtered)} className=''><img className={filtered ? 'w-14 transform rotate-90 border-2 rounded-full' : 'w-14 transform rotate-90'} src={filterIcon} alt='Filter your todos'/></button>}
            </div>
            {todos && todos[0] === undefined && 
                <div>
                    <h1 className='text-2xl mt-14 font-roboto'>Start your todo list</h1>
                    <button onClick={() => setAddInput(true)}><img className='w-14' src={addIcon} alt='Add new todo'/></button>
                </div>
            }
            {filtered && <h2 className='text-2xl mt-14 font-roboto'>Done todos</h2>}
            {!filtered ? <ul className="pb-16 bg-white m-auto overscroll-auto">
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
        </div>
    )
}

export default TodoList
