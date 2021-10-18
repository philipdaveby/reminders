import React, { useState, useEffect } from 'react'
import { signOut } from '../../utils';
import AddTodo from '../AddTodo/AddTodo'
import TodoList from '../TodoList/TodoList'
import { useHistory } from 'react-router-dom'
import { io, Socket } from 'socket.io-client'
import config from '../../utils/config';
import firebase from 'firebase';

const Home = () => {

    const [socket, setSocket] = useState<Socket>(io);
    let [todos, setTodos] = useState(null);
    // const user = useContext(AuthContext);
    // const [newTodos, setNewTodos] = useState(false);
    const history = useHistory();

    useEffect(() => {
        console.log('UseEffect')
        getTodos();
        const newSocket = io(config.backend_url, {
            transports: ['websocket', 'flashsocket', 'htmlpage', 'xhr-polling', 'jsonp-polling']
        });
        setSocket(newSocket);
        socket.on('update-todos', () => {
            console.log('update-todos')
            getTodos()
        });
      return () => {
        socket.disconnect();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    
    const getTodos = async () => {
        console.log('inside auth')
        firebase.auth().onAuthStateChanged(user => {
            if (user) { 
                user.getIdToken(true)
                    .then(async idToken => {
                        const response = await fetch('http://localhost:8000/api/todos', {
                            method: 'GET',
                            headers: {
                                'Authorization': idToken
                            }
                        });
                        const res = await response.json();
                        setTodos(res)
                    })
                    .catch((error) => {
                        console.log('We had an error loading data');
                    });
             }
          });
    }

    const logOut = () => {
        history.push('/login');
        signOut();
    }

    return (
        <div>
            {/* {!user ? history.push('/login') : ''} <div> */}
                <h1 className="text-2xl mt-5">Reminders Todo App</h1>
                <TodoList todos={todos} socket={socket} />
                <AddTodo todos={todos} setTodos={setTodos} socket={socket}/>
                <button onClick={logOut}>Sign Out</button>
            {/* </div> */}
        </div>
    )
}

export default Home
