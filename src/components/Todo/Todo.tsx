import React, { useState } from 'react'
import firebase from 'firebase/app'
import { Socket } from 'socket.io-client';
import config from '../../utils/config';
import deleteIcon from '../../icons/delete.png'
import editIcon from '../../icons/edit.png'
import doneIcon from '../../icons/done1.png'
import saveIcon from '../../icons/save.png'


interface TodoProps {
    todo: Todo,
    socket: Socket
}

const Todo = ({ todo, socket }: TodoProps) => {

    const [completed, setCompleted] = useState<boolean>(todo.isComplete);
    const [editedTodo, setEditedTodo] = useState<string | null>(null)
    const input = React.useRef(null);
    const [subTask, setSubTask] = useState<boolean>(false);
    const [edit, setEdit] = useState(false)
    // const inputRef = useRef<HTMLElement>();
    const [tempSubTasks, setTempSubTasks] = useState<SubTask[]>([
        {
            task: 'Cucumber',
            isComplete: false,
            todoId: 91820093,
            _id: 'djk3828jasdk',
            owner: '12345678@gmail.com',
            locked: false
        },
        {
            task: 'Milk',
            isComplete: false,
            todoId: 382801096,
            _id: 'djskl38ksja',
            owner: '12345678@gmail.com',
            locked: false
        }
    ]);

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
        .catch(error => console.log(error.message));
    })
    .catch(error => console.log(error.message));
        completed ? setCompleted(false) : setCompleted(true);
    }

    const deleteTodo = async (e: React.FormEvent<HTMLButtonElement>) => {
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

    const saveTodo = async (e: React.FormEvent<HTMLButtonElement>) => {
        if (!editedTodo) {
            return;
        }
        setEdit(false);
        const id = e.currentTarget.id;
        await firebase.auth().currentUser?.getIdToken(true)
        .then(async idToken => {
                const response = await fetch(`${config.backend_url}/api/todos/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': idToken
                    },
                    body: JSON.stringify({task: editedTodo})
                });
                const res = await response.json();
                setEditedTodo(null)
                return res;
            }).then(() => socket.emit('add-todo'))
            .catch(error => console.log(error.message))
    }

    
    const editTodo = async (e: React.FormEvent<HTMLButtonElement>) => {
        setEdit(edit => !edit);
    }

    return (
        <div className="border rounded m-2">
            {edit ? <input ref={input} onChange={e => setEditedTodo(e.currentTarget.value)} className="m-1 border rounded"/>
            : 
            <div>
                <h3 id={todo.todoId.toString()} onClick={() => setSubTask(() => !subTask)} className={completed ? 'text-lg text-lightgray line-through' : 'text-lg'} >
                    {todo.task}
                </h3>
                {subTask ? tempSubTasks.map((sub: SubTask, index: number) => {
                    return  <div key={index} className="grid grid-cols-2">
                                <p className="text-base">{sub.task}</p>
                                <div className="flex">
                                    <button id={todo.todoId.toString()} onClick={e => deleteTodo(e)} className="m-1 pl-1 pr-1 cursor-pointer"><img src={deleteIcon} alt="delete icon" className="w-7"/></button> 
                                    <button id={todo.todoId.toString()} onClick={e => editTodo(e)} className="m-1 pl-1 pr-1 cursor-pointer"><img src={editIcon} alt="edit icon" className="w-6"/></button> 
                                    <button id={todo.todoId.toString()} onClick={e => completeTodo(e)} className="m-1 pl-1 pr-1 cursor-pointer"><img src={doneIcon} alt="done icon" className="w-7"/></button>
                                    {edit ? <button id={todo.todoId.toString()} onClick={e => saveTodo(e)} className="m-1 pl-1 pr-1 cursor-pointer"><img src={saveIcon} alt="save icon" className="w-7"/></button> : null}
                                </div>
                            </div>
                    })
                    : null}
                </div>}
            {subTask ? null : <div>
                <button id={todo.todoId.toString()} onClick={e => deleteTodo(e)} className="m-1 pl-1 pr-1 cursor-pointer"><img src={deleteIcon} alt="delete icon" className="w-7"/></button> 
                <button id={todo.todoId.toString()} onClick={e => editTodo(e)} className="m-1 pl-1 pr-1 cursor-pointer"><img src={editIcon} alt="edit icon" className="w-6"/></button> 
                <button id={todo.todoId.toString()} onClick={e => completeTodo(e)} className="m-1 pl-1 pr-1 cursor-pointer"><img src={doneIcon} alt="done icon" className="w-7"/></button>
                {edit ? <button id={todo.todoId.toString()} onClick={e => saveTodo(e)} className="m-1 pl-1 pr-1 cursor-pointer"><img src={saveIcon} alt="save icon" className="w-7"/></button> : null}
            </div>}
        </div>
    )
}

export default Todo
