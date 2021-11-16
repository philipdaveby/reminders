import React, { useContext, useRef } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Socket } from 'socket.io-client'
import config from '../../utils/config';
import closeIcon from '../../icons/close1.png'
import addIcon from '../../icons/add1.png'
import saveIcon from '../../icons/save1.png'
import filterIcon from '../../icons/filter.png'

interface AddTodoProps {
    socket: Socket,
    addInput: boolean,
    setAddInput: any,
    todos: Array<Todo> | null,
    filtered: boolean,
    setFiltered: any
}

const AddTodo = ({ socket, addInput, setAddInput, todos, filtered, setFiltered }: AddTodoProps) => {

    const user = useContext(AuthContext);
    const inputAddTodoRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const task = e.currentTarget.task.value;
        if (!task) return;
        setAddInput(false)
        const todoObject = {
            task,
            userId: user?.uid
        }
        e.currentTarget.task.value = ''
        await user?.getIdToken(true)
            .then(async idToken => {
                await fetch(`${config.backend_url}/api/todos`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': idToken
                    },
                    body: JSON.stringify({todoObject})
                }).catch(err => console.log(err));
            
        })
        .catch(error => console.log(error.message));
        socket.emit('add-todo')
    }

    const handleAddInput = () => {
        setAddInput(!addInput);
        setTimeout(() => {
            inputAddTodoRef.current?.focus();
        });
    }

    return (
            <form onSubmit={e => handleSubmit(e)} className='z-10 flex justify-evenly items-center fixed bottom-0 w-full pb-2 bg-white'>
                <button type="submit" title='Save todo' className={!addInput ? 'invisible' : ''}><img className='w-9' src={saveIcon} alt='Add todo'/></button>
                <input ref={inputAddTodoRef} type="text" name="task" placeholder="Enter you todo..." className={!addInput ? 'invisible rounded mx-2 h-10' : 'rounded mx-2 h-10'} />
                <img src={closeIcon} alt='Close todo input' title='Close' className={!addInput ? 'w-10 cursor-pointer hidden' : 'w-10 cursor-pointer'} onClick={() => setAddInput(!addInput)} />
                {todos && todos[0] && <img src={addIcon} alt='add new todo' title='Add new todo' className={addInput ? 'w-12 cursor-pointer hidden' : 'w-12 cursor-pointer'} onClick={handleAddInput} />}
                {todos && todos[0] && <button type='button' title='Filter completed todos' onClick={() => setFiltered(!filtered)} className=''><img className={filtered ? 'w-14 transform rotate-90 border-2 rounded-full' : 'w-14 transform rotate-90'} src={filterIcon} alt='Filter your todos'/></button>}
            </form>
    )
}

export default AddTodo
