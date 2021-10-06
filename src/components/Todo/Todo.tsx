import React, { useState } from 'react'
import firebase from 'firebase/app'

interface TodoProps {
    todo: Todo,
    edit: boolean
}

const Todo = ({ todo, edit }: TodoProps) => {

    const [completed, setCompleted] = useState<boolean>(todo.isComplete);
    const [subTask, setSubTask] = useState<boolean>(false);
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

    const completeTodo = async (e: React.FormEvent<HTMLParagraphElement>) => {

        const id = e.currentTarget.id;
        await firebase.auth().currentUser?.getIdToken(true)
            .then(async idToken => {
        await fetch(`http://localhost:8000/api/todo/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': idToken
            },
            body: JSON.stringify({
                isComplete: !completed
            })
        })
        .catch(error => console.log(error.message));
    })
        completed ? setCompleted(false) : setCompleted(true);
    }

    const deleteTodo = async (e: React.FormEvent<HTMLButtonElement>) => {
        const id = e.currentTarget.id;
        await firebase.auth().currentUser?.getIdToken(true)
            .then(async idToken => {
                await fetch(`http://localhost:8000/api/todo/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': idToken
                    }
                });
            }).catch(error => console.log(error.message))
    }

    const editTodo = async (e: React.FormEvent<HTMLButtonElement>) => {

    }

    return (
        <div className="border rounded m-2">
            <h3 id={todo.todoId.toString()} onClick={() => subTask ? setSubTask(false) : setSubTask(true)} className={completed ? 'text-lg text-lightgray line-through' : 'text-lg'}>
                    {todo.task}
                    {todo.subTasks.map((sub, index) => {
                        return sub.task ? <div>{sub.task}</div> : ''
                    })}
                </h3>
            {/* {subTask ? tempSubTasks.map((task: SubTask, index: number) => {
                return <div key={index}>
                            {task.task}
                        </div>
            })
            : ''} */}
            {edit ? 
            <div>
                <button id={todo.todoId.toString()} onClick={e => deleteTodo(e)} className="m-1 border rounded pl-1 pr-1">Delete</button> 
                <button id={todo.todoId.toString()} onClick={e => editTodo(e)} className="m-1 border rounded pl-1 pr-1">Edit</button> 
            </div>
            : ''}
        </div>
    )
}

export default Todo
