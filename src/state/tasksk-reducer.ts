import {TasksStateType} from "../App";


import {v1} from "uuid";


type stateType = TasksStateType
type ActionType = RemoveTaskAT | AddTaskAT | ChangeTaskStatusAT | ChangeTaskTitleAT | AddTodolistAT


export const taskReducer = (state: stateType, action: ActionType): stateType => {

    switch (action.type) {
        case "REMOVE-TASK": {
            let todolistTasks = state[action.todolistId]
            state[action.todolistId] = todolistTasks.filter(t => t.id !== action.id)
            return {...state}
        }
        case "ADD-TASK":{
            let task = {id: v1(), title: action.title, isDone: false};
            let todolistTasks = state[action.todolistId]
            state[action.todolistId] = [task, ...todolistTasks];
            return {...state}
        }
        case "CHANGE-STATUS-TASK":{
            let todolistTasks = state[action.todolistId]
           let task = todolistTasks.find(t => t.id === action.id)
            if (task){
                task.isDone = action.isDone
            }
            return {...state}
        }
        case "CHANGE-TITLE-TASK":{
            let todolistTasks = state[action.todolistId]
            let task = todolistTasks.find(t => t.id === action.id)
            if (task){
                task.title = action.newTitle
            }
            return {...state}
        }


        default:
            throw new Error("type")
    }
}


export const removeTaskAC = (id: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', id, todolistId} as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {type: 'ADD-TASK', title, todolistId} as const
}
export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string) => {
    return {type: 'CHANGE-STATUS-TASK', id, isDone,todolistId} as const
}
export const changeTaskTitleAC=(id: string, newTitle: string, todolistId: string)=> {
    return {type: 'CHANGE-TITLE-TASK', id, newTitle,todolistId} as const
}
export const AddTodolistAC=(title: string)=> {
    return {type: 'ADD-TODOLIST', title} as const
}


export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export type AddTaskAT = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>
export type AddTodolistAT = ReturnType<typeof AddTodolistAC>