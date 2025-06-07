import { FormEvent, FC, use } from "react"
import { supabase } from "../utils/supabase"
import useStore from "../store"
import { useMutateTask } from "../hooks/useMutateTask"

export const TaskForm:FC = () => {
    const { editedTask } = useStore()
    const update = useStore((state) => state.updateEditedTask)
    const { createTaskMutation, updateTaskMutation } = useMutateTask()
    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (editedTask.id === "") {
            await createTaskMutation.mutateAsync({
                title: editedTask.title,
                user_id: supabase.auth.user()?.id,
            })
        } else {
            await updateTaskMutation.mutateAsync({
                id: editedTask.id,
                title: editedTask.title,
            })
        }
                update({ id: "", title: "" })
            }

    return (
    <form onSubmit={submitHandler} >
        <input
            type="text"
            value={editedTask.title}
            onChange={(e) => update({ id: editedTask.id, title: e.target.value })}
            placeholder="Task Title"
            className="my-2  border border-gray-300 rounded px-3 py-2 placeholder-gray-500 focus:outline-none  focus:border-indigo-500 text-sm"
        />
        <button
            type="submit"
            className="bg-indigo-600 text-white rounded px-3 py-2 hover:bg-indigo-700 placeholder-gray-500"
        >
            {editedTask.id === "" ? "Create" : "Updata"}
        </button>
    </form>
)
}


