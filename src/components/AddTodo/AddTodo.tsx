import React, { useContext, useRef, useState, Dispatch, SetStateAction } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Socket } from 'socket.io-client'
import config from '../../utils/config';
import closeIcon from '../../icons/close1.png'
import addIcon from '../../icons/add1.png'
import saveIcon from '../../icons/save1.png'
import filterIcon from '../../icons/filter.png'

interface AddTodoProps {
    socket: Socket,
    todos: Array<Todo> | null,
    filtered: boolean,
    setFiltered: Dispatch<SetStateAction<boolean>>
}

const AddTodo = ({ socket, todos, filtered, setFiltered }: AddTodoProps) => {

    const [addInput, setAddInput] = useState<boolean>(false)
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
        <div className='z-10 fixed bottom-0 w-full'>
            <form onSubmit={e => handleSubmit(e)} className='flex max-w-3xl m-auto justify-evenly items-center  pb-2 bg-white'>
                {todos && todos[0] === undefined && 
                <div className='fixed top-40'>
                    <h1 className='text-2xl mt-14'>Create your first To-Do</h1>
                    <button onClick={handleAddInput}><img className='w-14' src={addIcon} alt='Add new to-do'/></button>
                </div>
            }
                <button type="submit" title='Save to-do' className={!addInput ? 'invisible' : ''}><img className='w-9' src={saveIcon} alt='Add to-do'/></button>
                <input ref={inputAddTodoRef} type="text" name="task" placeholder="Enter your to-do..." className={!addInput ? 'invisible rounded mx-2 h-8' : 'rounded mx-2 h-8'} />
                <div className='flex justify-around items-center'>
                    <img src={closeIcon} alt='Close to-do input' title='Close' className={!addInput ? 'w-12 cursor-pointer hidden' : 'w-12 cursor-pointer'} onClick={() => setAddInput(!addInput)} />
                    {todos && todos[0] && <img src={addIcon} alt='add new to-do' title='Add new to-do' className={addInput ? 'w-12 cursor-pointer hidden' : 'w-12 cursor-pointer'} onClick={handleAddInput} />}
                    {todos && todos[0] && <button type='button' title='Filter completed to-dos' onClick={() => setFiltered(!filtered)} className=''><img className={filtered ? 'w-14 transform rotate-90 border-2 rounded-full mr-4' : 'w-14 transform rotate-90 mr-4'} src={filterIcon} alt='Filter your to-dos'/></button>}
                </div>
            </form>
        </div>
    )
}

export default AddTodo
