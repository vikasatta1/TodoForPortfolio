import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

type stateType = Array<TodolistType>

type ActionType = RemoveTodolistAT | AddTodolistAT | ChangeTodolistTitleAT | ChangeTodolistFilterAT


export const todolistReducer = (state: stateType, action: ActionType): Array<TodolistType> => {

    switch (action.type) {

        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id != action.id)

        }
        case 'ADD-TODOLIST': {

            let newTodolistId = v1();
           let newTodolist: TodolistType = {id: newTodolistId, title: action.title, filter: 'all'};
           return [...state,newTodolist]

        }
        case 'CHANGE-TODOLIST-TITLE':{
          let todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.title = action.title;
               return [...state];
            }
            return [...state]
        }
        case "CHANGE-TODOLIST-FILTER":{
            let todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter;
                return [...state];
            }
            return [...state]
        }


        default:
            throw new Error("type")
    }
}


export const removeTodolistAC = (id: string) => {
    return {type: 'REMOVE-TODOLIST', id} as const
}
export const addTodolistAC = (title: string) => {
    return {type: 'ADD-TODOLIST', title} as const
}
export const changeTodolistTitleAC = (id:string,title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title} as const}
export const changeTodolistFilterAC = (id:string,filter: FilterValuesType) => {
    return  {type: 'CHANGE-TODOLIST-FILTER', id, filter} as const}

export type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>
export type AddTodolistAT = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>