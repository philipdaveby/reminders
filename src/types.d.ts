
type Todo = {
    task: string,
    isComplete: boolean,
    todoId: string,
    _id: string,
    userId: string,
    collaborators: string[],
    locked: boolean,
    subTasks: SubTask[]
}

type SubTask = {
    task: string,
    isComplete: boolean,
    subId: string,
    locked: boolean
}

type socketProps = {
    socket: Socket
}