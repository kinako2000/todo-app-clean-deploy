import { FC } from "react"
import { useQueryTasks } from "../hooks/useQueryTasks"
import { Spinner } from "./Spinner"
import { TaskItem } from "./TaskItem"

export const TaskList:FC = () => {
    const { data: Tasks, isLoading, isError } = useQueryTasks()

    if (isLoading) return <Spinner />
    if (isError) return <div>Error loading tasks</div>

    return (
            <ul className="my-2">
                {Tasks?.map((task) => (
                        <TaskItem
                            key={task.id}
                            id={task.id}
                            title={task.title}
                        />))}
                </ul>
    )
}


