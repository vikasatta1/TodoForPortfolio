import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeStatus: (taskID: string, isDone: boolean) => void
}

export function Todolist(props: PropsType) {
    const [taskTitle, setTaskTitle] = useState('')
    const addTask = () => {
        if (taskTitle.trim().length > 0) {
            props.addTask(taskTitle.trim())
            setTaskTitle('')
        }

    }
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)

    }
    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask()
        }
    }


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={taskTitle} onChange={onChange} onKeyPress={onKeyPress}/>
            <button onClick={addTask}>+
            </button>
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {props.changeStatus(t.id,e.currentTarget.checked)}
                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>
                        <span>{t.title}</span>

                        <button onClick={() => {
                            props.removeTask(t.id)
                        }}>x
                        </button>
                    </li>
                })
            }
        </ul>
        <div>
            <button onClick={() => {
                props.changeFilter("all")
            }}>
                All
            </button>
            <button onClick={() => {
                props.changeFilter("active")
            }}>
                Active
            </button>
            <button onClick={() => {
                props.changeFilter("completed")
            }}>
                Completed
            </button>
        </div>
    </div>
}
