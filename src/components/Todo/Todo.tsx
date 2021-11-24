import React, { useState, FormEvent } from 'react'
import firebase from 'firebase/app'
import { Socket } from 'socket.io-client';
import config from '../../utils/config';
import { notify } from '../../utils/index'

import SubTask from '../SubTask/SubTask';
import TodoMenu from '../TodoMenu/TodoMenu'
import saveIcon from '../../icons/save1.png'
import closeIcon from '../../icons/close1.png'
import arrowIcon from '../../icons/arrow.png'
import sendIcon from '../../icons/send.png'
import collaboratorIcon from '../../icons/person.png'

interface TodoProps {
    todo: Todo,
    getTodos: any,
    socket: Socket
}

const Todo = ({ todo, socket, getTodos }: TodoProps) => {

    const [editedTodo, setEditedTodo] = useState<string | null>(null)
    const [openSubTask, setOpenSubTask] = useState(false);
    const [addSubTaskInput, setAddSubTaskInput] = useState(false);
    const [newSubTask, setNewSubTask] = useState('');
    const [edit, setEdit] = useState(false)
    const [addPerson, setAddPerson] = useState(false)
    const [addingCollaborator, setAddingCollaborator] = useState<string | null>(null)
    const inputSubTaskRef = React.useRef<HTMLInputElement>(null);
    const inputEditTodoRef = React.useRef<HTMLInputElement>(null);
    const inputAddPersonRef = React.useRef<HTMLInputElement>(null);

    const saveTodo = async (e:  FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!editedTodo) {
            setEdit(edit => !edit);
            return;
        }
        setEdit(false);
        const id = e.currentTarget.id;
        await firebase.auth().currentUser?.getIdToken(true)
        .then(async idToken => {
                await fetch(`${config.backend_url}/api/todos/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': idToken
                    },
                    body: JSON.stringify({task: editedTodo})
                });
                getTodos()
                setEditedTodo(null)
            }).then(() => socket.emit('add-todo'))
            .catch(error => console.log(error.message))
    }
    
    const editTodo = async (e: FormEvent<HTMLButtonElement>) => {
        setEdit(edit => !edit);
        setTimeout(() => {
            inputEditTodoRef.current?.focus();
        });
    }

    const sendNewSubTask = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const id = e.currentTarget.id;

            await firebase.auth().currentUser?.getIdToken(true)
                .then(async idToken => {
                        await fetch(`${config.backend_url}/api/todos/${id}`, {
                                method: 'PATCH',
                                headers: {
                                        'Authorization': idToken,
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                            subTask: newSubTask
                                        })
                                    })
                                .catch(error => console.log(error.message));
                            }).then(() => socket.emit('add-todo'))
                        .catch(error => console.log(error.message));
        setNewSubTask('');
        setAddSubTaskInput(false);
        setOpenSubTask(true);
    }

    const addSubTask = () => {
        setAddSubTaskInput(!addSubTaskInput)
        setTimeout(() => {
            inputSubTaskRef.current?.focus();
        });
    }

    const openSubTasks = () => {
        openSubTask && setAddSubTaskInput(false);
        setOpenSubTask(!openSubTask);
    }

    const addPersonInput = () => {
        setAddPerson(() => !addPerson);
        setTimeout(() => {
            inputAddPersonRef.current?.focus();
        });
    }
    
    const addCollaborator = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const id = e.currentTarget.id;
        if (!addingCollaborator) return;
        if (todo.collaborators.some(user => user.email === addingCollaborator)) {
            notify('The collaborator already has access.', 'already-access');
            return;
        }
        
        firebase.auth().fetchSignInMethodsForEmail(addingCollaborator)
        .then(providers => {
            if (providers.length === 0) {
                notify("There is no existing account with that e-mail address", 'no-account');
                return;
            }
            firebase.auth().currentUser?.getIdToken(true)
                .then(async idToken => {
                        await fetch(`${config.backend_url}/api/todos/${id}`, {
                                method: 'PATCH',
                                headers: {
                                        'Authorization': idToken,
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                            collaborator: addingCollaborator
                                        })
                                    })
                                .catch(error => console.log(error.message));
                            }).then(() => {
                                socket.emit('add-todo')
                                setAddPerson(false);
                                notify(`You have added ${addingCollaborator} as a collaborator to your todo!`, 'added-collaborator');
                            }).catch(error => console.log(error.message));
            })
            .catch(error => {
                if (error.code === 'auth/invalid-email') {
                    notify('Please enter a valid e-mail address', 'enter-valid-email');
                }
            });
        setAddingCollaborator(null)

    }

    return (
        <>
            <li className={todo.isComplete ? "z-0 relative border border-blue-900 rounded-lg m-2 mx-4 shadow-sm bg-li order-last" : "z-0 relative border border-blue-900 rounded-lg m-2 mx-4 shadow-sm bg-li order-first"}>
                {todo.collaborators[0] && <img src={collaboratorIcon} alt="You are collaborating on this to-do" title='You are collaborating on this to-do' className="absolute top-1 left-1 cursor-pointer w-7"/> }
                {edit ? 
                <form onSubmit={e => saveTodo(e)} id={todo.todoId.toString()}>
                    <input ref={inputEditTodoRef} onChange={e => setEditedTodo(e.currentTarget.value)} defaultValue={todo.task} className="m-1 border rounded"/>
                </form>
                : 
                <div id={todo.todoId.toString()} className='mb-2'>
                    <h3 id={todo.todoId.toString()} onClick={openSubTasks} className={todo.isComplete ? 'text-lg text-lightgray line-through cursor-pointer m-auto' : 'text-lg cursor-pointer m-auto'} >
                        {todo.task}
                    </h3>
                </div>}
                {todo.subTasks[0] && <img src={arrowIcon} title='Expand' onClick={openSubTasks} alt="Open sub tasks" className={openSubTask ? "w-7 absolute top-1 right-1 cursor-pointer transform rotate-180" : "w-7 absolute top-1 right-1 cursor-pointer"}/>}
                <ul className="flex flex-col">
                    {openSubTask && todo.subTasks.map((sub: SubTask, index: number) => {
                        return  <SubTask sub={sub} key={index} socket={socket} todo={todo} edit={edit} completed={todo.isComplete} />})}
                </ul>

                {addSubTaskInput &&
                <form className="flex content-center justify-center" onSubmit={e => sendNewSubTask(e)} id={todo.todoId.toString()} >
                    <input onChange={e => setNewSubTask(e.currentTarget.value)} ref={inputSubTaskRef} className="m-1 border rounded"/>
                    <button type="submit" title='Save sub task' className="m-1 pl-1 pr-1 cursor-pointer"><img src={saveIcon} alt="save sub task" className="w-7"/></button>
                    <button type="button" onClick={() => setAddSubTaskInput(false)} title='Cancel' className="m-1 pl-1 pr-1 cursor-pointer"><img src={closeIcon} alt="close input box" className="w-7"/></button>
                </form>}

                {addPerson &&
                <form onSubmit={e => addCollaborator(e)} id={todo.todoId.toString()} className="flex content-center justify-center">
                    <button type='submit' title='Send invite' id={todo.todoId.toString()} className="m-1 pl-1 pr-1 cursor-pointer"><img src={sendIcon} alt="Invite collaborator" className="w-7" id={todo.todoId.toString()} /></button>
                    <input onChange={e => setAddingCollaborator(e.currentTarget.value)} placeholder='Enter email to add person..' ref={inputAddPersonRef} className="m-1 w-60 border rounded"/>
                    <button type="button" onClick={() => setAddPerson(false)} title='Cancel' className="m-1 pl-1 pr-1 cursor-pointer"><img src={closeIcon} alt="close input box" className="w-7"/></button>
                </form>}
                <TodoMenu edit={edit} todo={todo} completed={todo.isComplete} saveTodo={saveTodo} addSubTask={addSubTask} addPersonInput={addPersonInput} editTodo={editTodo} socket={socket} />
            </li>
        </>
    )
}

export default Todo
