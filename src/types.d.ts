
type Todo = {
    task: string,
    isComplete: boolean,
    todoId: string,
    _id: string,
    userId: string,
    locked: boolean,
    subTasks: [SubTask]
}

type SubTask = {
    task: string,
    isComplete: boolean,
    subId: string,
    _id: string,
    userId: string,
    locked: boolean
}

type socketProps = {
    socket: Socket
}