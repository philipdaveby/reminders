import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Socket } from 'socket.io-client'
import config from '../../utils/config';
import closeIcon from '../../icons/close1.png'
import addIcon from '../../icons/add1.png'

interface AddTodoProps {
    socket: Socket
}

const AddTodo = ({ socket }: AddTodoProps) => {

    const [addInput, setAddInput] = useState(false)
    const user = useContext(AuthContext);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const task = e.currentTarget.task.value;
        if (!task) return;
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

    return (
            <form onSubmit={e => handleSubmit(e)} className='flex justify-evenly items-center fixed bottom-0 w-full bg-white p-2'>
                <div></div>
                <div className='flex justify-evenly items-center'>
                    <input type="text" name="task" placeholder="Enter you todo..." className={!addInput ? 'invisible rounded mr-5' : 'rounded mr-5'} />
                    <button type="submit" className={!addInput ? 'invisible' : ''}><img className='w-14' src={addIcon} alt='Add todo'/></button>
                </div>
                <img src={closeIcon} alt='Close todo input' className={!addInput ? 'w-14 cursor-pointer hidden' : 'w-14 cursor-pointer'} onClick={() => setAddInput(!addInput)} />
                <img src={addIcon} alt='add new todo' className={addInput ? 'w-14 cursor-pointer hidden' : 'w-14 cursor-pointer'} onClick={() => setAddInput(!addInput)} />
            </form>
    )
}

export default AddTodo
