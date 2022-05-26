import axios from "axios";
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': 'dff2b0dc-55bd-439a-8c96-6ab659f7b37e'
    },
})

const settings = {
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': 'dff2b0dc-55bd-439a-8c96-6ab659f7b37e'
    },
}

export const todolistAPI = {
    getTodolist() {
        return instance.get<Array<TodolistType>>('https://social-network.samuraijs.com/api/1.1/todo-lists')
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType<{}>>(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title: title})
    },
    createTodolist(title: string){
        return  instance.post<ResponseType<{item:TodolistType}>>('https://social-network.samuraijs.com/api/1.1/todo-lists', {title})
    }
}



type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}
type ResponseType<T> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}

