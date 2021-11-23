
type Todo = {
    task: string,
    isComplete: boolean,
    todoId: string,
    _id: string,
    userId: string,
    collaborators: Collaborators[],
    locked: boolean,
    subTasks: SubTask[]
}

type SubTask = {
    task: string,
    isComplete: boolean,
    subId: string,
    locked: boolean
}

type Collaborators = {
    userId: string,
    email: string
}

type socketProps = {
    socket: Socket
}