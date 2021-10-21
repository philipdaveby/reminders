import React, { useState, useRef } from 'react'
import deleteIcon from '../../icons/delete1.png'
import editIcon from '../../icons/edit1.png'
import doneIcon from '../../icons/done2.png'
import saveIcon from '../../icons/save1.png'
import firebase from 'firebase/app'
import config from '../../utils/config'
import { Socket } from 'socket.io-client';

interface SubTaskProps {
    sub: SubTask,
    socket: Socket,
    todo: Todo
}

const SubTask = ({ sub, socket, todo }: SubTaskProps) => {

    const [edit, setEdit] = useState<boolean>(false);
    const [editedSubTask, setEditedSubTask] = useState<string>('');
    const [completed, setCompleted] = useState<boolean>(sub.isComplete);
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
                    isComplete: !completed
                })
            })
            .catch(error => console.log(error.message));
        })
        .catch(error => console.log(error.message));
            completed ? setCompleted(false) : setCompleted(true);
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
        setEdit(edit => !edit)
        setTimeout(() => {
            inputEditSubTaskRef.current?.focus();
        });
    }

    const saveEditedSubTask = async (e: React.FormEvent<HTMLButtonElement>) => {
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
                    setEditedSubTask('');
                    setEdit(false);
                }).catch(error => console.log(error.message));
            }).catch(error => console.log(error.message))
    }


    return (
        <li key={sub.subId} className={completed ? "grid grid-cols-4 order-last" : "grid grid-cols-4 order-first"}>
            {edit ? 
            <button id={sub.subId.toString()} onClick={e => saveEditedSubTask(e)} className="m-1 pl-1 pr-1 cursor-pointer">
                <img src={saveIcon} alt="save edited sub task" className="w-6"/>
            </button> 
            : 
            <button id={sub.subId.toString()} onClick={completeSubTask} className="m-1 pl-1 pr-1 cursor-pointer">
                <img src={doneIcon} alt="mark sub task as done" className="w-7"/>
            </button>}

            

            {edit ? 
            <input onChange={e => setEditedSubTask(e.currentTarget.value)} ref={inputEditSubTaskRef} className="m-1 border rounded col-start-2 col-end-4"/>
            :
            <div className="flex col-start-2 col-end-4 justify-center">
                <p className={completed ? 'text-base self-center text-lightgray line-through' : 'text-base self-center'}>{sub.task}</p>
            </div>}

            <div className="flex content-center">
                <button id={sub.subId.toString()} onClick={editSubTask} className="m-1 pl-1 pr-1 cursor-pointer"><img src={editIcon} alt="edit sub task" className="w-9"/></button> 
                <button id={sub.subId.toString()} onClick={e => deleteSubTask(e)} className="m-1 pl-1 pr-1 cursor-pointer"><img src={deleteIcon} alt="delete sub task" className="w-10"/></button>
            </div>
        </li>
    )
}

export default SubTask
