import { FC } from "react"
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid"
import useStore from "../store"
import { useMutateTask } from "../hooks/useMutateTask"
import { Task } from "../types/types"

export const TaskItem:FC<Omit<Task,'created_at' | 'user_id'>> = ({ id,title }) => {
    const updata =  useStore((state) => state.updateEditedTask)
    const { deleteTaskMutation } = useMutateTask()
  return (
<li className="my-3 text-lg font-extrabold">
      <span>{title}</span>
      <div className="float-right ml-20 flex">
        <PencilAltIcon
          className="h-5 w-5 text-blue-500 cursor-pointer"
          onClick={() => updata({ id: id, title: title})}
        />
        <TrashIcon
          className="h-5 w-5 text-blue-500 cursor-pointer"
          onClick={() => deleteTaskMutation.mutateAsync(id)}
        />
      </div>
</li>
)}

