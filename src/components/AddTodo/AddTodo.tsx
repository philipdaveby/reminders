import React, { useContext, useRef } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Socket } from 'socket.io-client'
import config from '../../utils/config';
import closeIcon from '../../icons/close1.png'
import addIcon from '../../icons/add1.png'
import saveIcon from '../../icons/save1.png'

interface AddTodoProps {
    socket: Socket,
    addInput: boolean,
    setAddInput: any,
    todos: Array<Todo> | null
}

const AddTodo = ({ socket, addInput, setAddInput, todos }: AddTodoProps) => {

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
            <form onSubmit={e => handleSubmit(e)} className='flex justify-evenly items-center fixed bottom-0 w-full bg-white p-2'>
                <div></div>
                <div className='flex justify-evenly items-center'>
                    <input ref={inputAddTodoRef} type="text" name="task" placeholder="Enter you todo..." className={!addInput ? 'invisible rounded mr-5' : 'rounded mr-5'} />
                    <button type="submit" className={!addInput ? 'invisible' : ''}><img className='w-11' src={saveIcon} alt='Add todo'/></button>
                </div>
                <img src={closeIcon} alt='Close todo input' className={!addInput ? 'w-12 cursor-pointer hidden' : 'w-12 cursor-pointer'} onClick={() => setAddInput(!addInput)} />
                {todos && todos[0] && <img src={addIcon} alt='add new todo' className={addInput ? 'w-14 cursor-pointer hidden' : 'w-14 cursor-pointer'} onClick={handleAddInput} />}
            </form>
    )
}

export default AddTodo
