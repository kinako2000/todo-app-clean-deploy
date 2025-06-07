    import {  useMutation, useQueryClient } from "@tanstack/react-query";
    import { supabase } from "../utils/supabase";
    import { Task, EditedTask } from "../types/types";
    import useStore from "../store";

    export const useMutateTask = () => {
        const queryClient = useQueryClient();
        const reset = useStore((state) => state.resetEditedTask);
        const createTaskMutation = useMutation({
            mutationFn:
            async (newTask: Omit<Task, 'id' | 'created_at'>):
            Promise<Task[]> => {
                        const { data, error } = await supabase
                            .from('todos')
                            .insert([newTask])
                            .select();
                            if (error) {
                                throw new Error(error.message);
                            }
                        return data!;
                        },
            onSuccess: (data) => {
                queryClient.setQueryData<Task[]>(['todos'],
                    (old) => [...(old ?? []), data[0]]);
                reset();
            },
            onError: (error:Error) => {
                alert(error.message);
                reset();
            },
    })
        const updateTaskMutation = useMutation({
            mutationFn: async (editedTask: EditedTask): Promise<Task[]> => {
                const { data, error } = await supabase
                    .from('todos')
                    .update({ title: editedTask.title })
                    .eq('id', editedTask.id)
                    .select();
                if (error) {
                    throw new Error(error.message);
                }
                return data;
            },
            onSuccess: (res,variables) => {
                queryClient.setQueryData<Task[]>(['todos'], (old) =>
                    old?.map((task) => {
                        if (task.id === variables.id) {
                            return { ...task, title: res[0].title };
                        }
                        return task;
                    })
                );
                reset();
            },
            onError: (error: Error) => {
                alert(error.message);
                reset();
            }
        })
        const deleteTaskMutation = useMutation({
            mutationFn: async (id: string): Promise<Task[]> => {
                        const { data, error } = await supabase
                            .from('todos')
                            .delete()
                            .eq('id', id)
                            .select();
                        if (error) {
                            throw new Error(error.message);
                        }
                        return data;
                        },
            onSuccess: (_, variables) => {
                        queryClient.setQueryData<Task[]>(['todos'], (old) =>
                            old?.filter((task) => task.id !== variables)
                        );
                        },
            onError: (error: Error) => {
                        alert(error.message);
                        }
        })
        return {
            createTaskMutation,
            updateTaskMutation,
            deleteTaskMutation,
        };
}