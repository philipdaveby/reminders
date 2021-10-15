import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from "../../contexts/AuthContext";
import { signOut } from '../../utils';
import AddTodo from '../AddTodo/AddTodo'
import TodoList from '../TodoList/TodoList'
import { useHistory } from 'react-router-dom'
import { io, Socket } from 'socket.io-client'
import config from '../../utils/config';

const Home = () => {

    const [socket, setSocket] = useState<Socket>(io);

    useEffect(() => {
        // const newSocket = io(config.backend_url);
        const newSocket = io(`${config.backend_url}`, {
            reconnectionDelay: 1000,
            reconnection: true,
            transports: ['websocket', 'flashsocket', 'htmlpage', 'xhr-polling', 'jsonp-polling'],
            agent: false,
            upgrade: false,
            rejectUnauthorized: false,
          });
        setSocket(newSocket);
      return () => {
        socket.disconnect();
      }
    }, [])

    let [todos, setTodos] = useState(null);
    const user = useContext(AuthContext);
    const [newTodos, setNewTodos] = useState(false);
    const history = useHistory();
    
    useEffect(() => {
        getTodos()
        socket.on('server-added-todo', () => {
            console.log('server-added-todo')
            getTodos()
        });
    }, [])
    // useEffect(() => {
    //     socket.on('server-added-todo', async () => {
    //         console.log('server-added-todo')
    //         await getTodos()
    //         .then((todos: any) => {
    //             console.log('Just fetched data through socket')
    //             setTodos(todos)
    //         }).catch((error) => {
    //             console.log('Could not set todos: ' + error)
    //         });
    //     });
    // }, [])

    // useEffect(() => {
    //     // let isMounted = true; 

    //     getTodos()
    //     //     .then((todoList: any) => {
    //     //         // console.log('Todolist: ' + todoList)
    //     //         if (!isMounted) {
    //     //             console.log('not mounted')
    //     //             return;
    //     //         }
    //     //         // console.log('Inside useEffect')
    //     //         setTodos(todoList)
    //     //     });
    //     // return () => { isMounted = false }; 
    // }, []);

    const getTodos = async () => {
        const fetchedTodos = await user?.getIdToken(true)
                .then(async idToken => {
                    // console.log('Fetching')
                    const response = await fetch('http://localhost:8000/api/todos', {
                        method: 'POST',
                        headers: {
                            'Authorization': idToken
                        }
                    });
                const res = await response.json();
                // console.log(JSON.stringify(res))
                return await res;
                })
                .catch((error) => {
                console.log('We had an error loading data');
        });
        setTodos(fetchedTodos)
    }

    const logOut = () => {
        history.push('/login');
        signOut();
    }

    return (
        <div>
            {/* {!user ? history.push('/login') : ''} <div> */}
                <h1 className="text-2xl mt-5">Reminders Todo App</h1>
                <TodoList todos={todos} />
                <AddTodo todos={todos} setTodos={setTodos} setNewTodos={setNewTodos} socket={socket}/>
                <button onClick={logOut}>Sign Out</button>
            {/* </div> */}
        </div>
    )
}

export default Home



        // firebase.auth().onAuthStateChanged((user) => {
        //     if (!user) {
        //         console.log('No user')
        //         return;
        //     } 
        //     return user.getIdToken(true)
        //         .then(async idToken => {
        //             const response = await fetch('http://localhost:8000/api/todos', {
        //                 method: 'POST',
        //                 headers: {
        //                     'Authorization': idToken
        //                 }
        //             });
        //         res = await response.json();
        //         console.log(JSON.stringify(res))
        //         // return res;
        //     }).catch((error) => {
        //         console.log('We had an error loading data')
        //     });    
        // })





        // const response = await fetch('http://localhost:8000/api/todos', {
        //             method: 'POST'
        //         });
        // res = await response.json();

        // return res

        // firebase.auth().onAuthStateChanged((user) => {
        //     if (!user) {
        //         console.log('No user')
        //         return
        //         // const res = firebase.auth().currentUser!.getIdToken(true)
        //         // console.log('inside currentuser if ' + res)   
        //       // https://firebase.google.com/docs/reference/js/firebase.User
        //     //   var uid = user.uid;
        //       // ...
        //     } 
        //     user.getIdToken(true)
        //     .then(async idToken => {
        //         const response = await fetch('http://localhost:8000/api/todos', {
        //             method: 'POST',
        //             headers: {
        //                 'Authorization': idToken
        //             }
        //         });
        //     res = await response.json();
        //     console.log('Inside getTodos: res: ' + await JSON.stringify(res))
        //     return res;
        // }).catch((error) => {
        //     console.log('We had an error loading data')
        // });
        // return;
        //   });
        //   console.log('last res: ' + res)
        // return await res;