import React, { Dispatch, SetStateAction, FormEvent } from 'react'
import firebase from 'firebase/app'
import config from '../../utils/config';
import { Socket } from 'socket.io-client';

import deleteIcon from '../../icons/delete1.png'
import editIcon from '../../icons/edit1.png'
import doneIcon from '../../icons/done2.png'
import addIcon from '../../icons/add1.png'
import addPersonIcon from '../../icons/addPerson4.png'
import saveIcon from '../../icons/save1.png'
import closeIcon from '../../icons/close1.png'

interface TodoMenuProps {
    todo: Todo,
    edit: boolean,
    getTodos: any,
    completed: boolean,
    setCompleted: Dispatch<SetStateAction<boolean>>,
    saveTodo: any,
    addSubTask: any,
    addPersonInput: any,
    editTodo: any,
    socket: Socket
}

const TodoMenu = ({ todo, edit, getTodos, completed, setCompleted, saveTodo, addSubTask, addPersonInput, editTodo, socket }: TodoMenuProps) => {

    const completeTodo = async (e: React.FormEvent<HTMLButtonElement>) => {
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
                    isComplete: !completed
                })
            })
        getTodos();
    })
    .catch(error => console.log(error.message));
        completed ? setCompleted(false) : setCompleted(true);
    }

    const deleteTodo = async (e: FormEvent<HTMLButtonElement>) => {
        const id = e.currentTarget.id;
        await firebase.auth().currentUser?.getIdToken(true)
            .then(async idToken => {
                await fetch(`${config.backend_url}/api/todos/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': idToken
                    }
                });
                socket.emit('add-todo')
            }).catch(error => console.log(error.message))
    }

    return (
        <div>
            {!edit && <button id={todo.todoId.toString()} onClick={e => completeTodo(e)} title='Mark as done' className="m-1 pl-1 pr-1 cursor-pointer"><img src={doneIcon} alt="mark todo as done" className="w-7"/></button>}
            {edit && <button id={todo.todoId.toString()} onClick={e => saveTodo(e)} title='Save todo' className="m-1 pl-1 pr-1 cursor-pointer"><img src={saveIcon} alt="save todo" className="w-7"/></button>}
            <button id={todo.todoId.toString()} onClick={() => addSubTask()} title='Add new sub task' className="m-1 pl-1 pr-1 cursor-pointer"><img src={addIcon} alt="add new todo" className="w-7"/></button>
            <button id={todo.todoId.toString()} onClick={addPersonInput} title='Add new collaborator' className="pl-1 pr-1 cursor-pointer"><img src={addPersonIcon} alt="add person to todo" className="w-7"/></button> 
            <button id={todo.todoId.toString()} onClick={e => editTodo(e)} title='Edit todo' className={edit ? "hidden m-1 pl-1 pr-1 cursor-pointer" : "m-1 pl-1 pr-1 cursor-pointer"}><img src={editIcon} alt="edit todo" className="w-7"/></button> 
            <button id={todo.todoId.toString()} onClick={e => editTodo(e)} title='Cancel' className={!edit ? "hidden m-1 pl-1 pr-1 cursor-pointer" : "m-1 pl-1 pr-1 cursor-pointer"}><img src={closeIcon} alt="edit todo" className="w-7"/></button> 
            <button id={todo.todoId.toString()} onClick={e => deleteTodo(e)} title='Delete todo' className="pl-1 pr-1 cursor-pointer"><img src={deleteIcon} alt="delete todo" className="w-8"/></button> 
        </div>
    )
}

export default TodoMenu
