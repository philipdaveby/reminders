import React, { useState, useRef } from 'react'
import deleteIcon from '../../icons/delete1.png'
import editIcon from '../../icons/edit1.png'
import doneIcon from '../../icons/done2.png'
import saveIcon from '../../icons/save1.png'
import closeIcon from '../../icons/close1.png'
import firebase from 'firebase/app'
import config from '../../utils/config'
import { Socket } from 'socket.io-client';

interface SubTaskProps {
    sub: SubTask,
    socket: Socket,
    todo: Todo,
    edit: boolean,
    completed: boolean
}

const SubTask = ({ sub, socket, todo, edit, completed }: SubTaskProps): JSX.Element => {

    const [editSub, setEditSub] = useState<boolean>(false);
    const [editedSubTask, setEditSubedSubTask] = useState<string>('');
    const inputEditSubTaskRef = useRef<HTMLInputElement>(null);

    const completeSubTask = async (e: React.FormEvent<HTMLButtonElement>) => {
            const id = todo.todoId;
            const subId = e.currentTarget.id;
            await firebase.auth().currentUser?.getIdToken(true)
                .then(async idToken => {
            await fetch(`${config.backend_url}/api/todos/${id}/subtasks/${subId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': idToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    isComplete: !sub.isComplete
                })
            })
            .catch(error => console.log(error.message));
        }).then(() => socket.emit('add-todo'))
        .catch(error => console.log(error.message));
    }

    const deleteSubTask = async (e: React.FormEvent<HTMLButtonElement>) => {
        const id = todo.todoId
        const subId = e.currentTarget.id;
        await firebase.auth().currentUser?.getIdToken(true)
            .then(async idToken => {
                await fetch(`${config.backend_url}/api/todos/${id}/subtasks/${subId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': idToken
                    }
                });
                socket.emit('add-todo')
            }).catch(error => console.log(error.message))
    }

    const editSubTask = () => {
        setEditSub(editSub => !editSub)
        setTimeout(() => {
            inputEditSubTaskRef.current?.focus();
        });
    }

    const saveEditedSubTask = async (e: React.FormEvent<HTMLButtonElement>|React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const id = todo.todoId
        const subId = e.currentTarget.id;
        await firebase.auth().currentUser?.getIdToken(true)
            .then(async idToken => {
                await fetch(`${config.backend_url}/api/todos/${id}/subtasks/${subId}`, {
                    method: 'PATCH',
                    headers: {
                        'Authorization': idToken,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        subTask: editedSubTask
                    })
                }).then(() => {
                    socket.emit('add-todo');
                    setEditSubedSubTask('');
                    setEditSub(false);
                }).catch(error => console.log(error.message));
            }).catch(error => console.log(error.message))
    }


    return (
        <li key={sub.subId} className={sub.isComplete ? "grid grid-cols-4 order-last" : "grid grid-cols-4 order-first"} >
            {editSub ? 
            <button id={sub.subId.toString()} onClick={e => saveEditedSubTask(e)} className="m-1 pl-1 pr-1 cursor-pointer">
                <img src={saveIcon} title='Save sub task' alt="save edited sub task" className="w-7"/>
            </button> 
            : 
            <button id={sub.subId.toString()} onClick={completeSubTask} className="m-1 pl-1 pr-1 cursor-pointer">
                <img src={doneIcon} title='Mark sub task as done' alt="mark sub task as done" className={completed ? "w-6 filter opacity-30" : 'w-6'}/>
            </button>}
            {editSub ? 
            <form className="m-1 border rounded col-start-2 col-end-4" onSubmit={e => saveEditedSubTask(e)} id={sub.subId.toString()} >
                <input onChange={e => setEditSubedSubTask(e.currentTarget.value)} ref={inputEditSubTaskRef} defaultValue={sub.task} />
            </form>
            :
            <div className="flex col-start-2 col-end-4 justify-center">
                <p className={sub.isComplete || completed ? 'text-base self-center text-lightgray line-through' : 'text-base self-center'}>{sub.task}</p>
            </div>}

            <div className="flex content-center justify-items-end" >
                {edit && <button data-testid="edit-menu" id={sub.subId.toString()} title='Edit sub task' onClick={editSubTask} className={editSub ? "hidden m-1 pl-1 pr-1 cursor-pointer" : "m-1 pl-1 pr-1 cursor-pointer"}><img src={editIcon} alt="editSub sub task" className="w-7"/></button> }
                <button id={sub.subId.toString()} title='Cancel' onClick={editSubTask} className={!editSub ? "hidden m-1 pl-1 pr-1 cursor-pointer" : "m-1 pl-1 pr-1 cursor-pointer"}><img src={closeIcon} alt="editSub sub task" className="w-7"/></button> 
                <button id={sub.subId.toString()} title='Delete sub task' onClick={e => deleteSubTask(e)} className={!edit ? "hidden m-1 pl-1 pr-1 cursor-pointer" : "m-1 pl-1 pr-1 cursor-pointer"}><img src={deleteIcon} alt="delete sub task" className="w-8"/></button>
            </div>
        </li>
    )
}

export default SubTask
