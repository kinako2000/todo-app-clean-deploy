import {  useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../utils/supabase";
import { Notice, EditedNotice } from "../types/types";
import useStore from "../store";

export const useMutateNotice = () => {
    const queryClient = useQueryClient();
    const reset = useStore((state) => state.resetEditedNotice);
    const createNoticeMutation = useMutation({
    mutationFn:
    async (newNotice: Omit<Notice, 'id' | 'created_at'>):
    Promise<Notice[]> => {
        const { data, error } = await supabase
                .from('notices')
                .insert([newNotice])
                .select();
                if (error) {
                    throw new Error(error.message);
                }
        return data!;
        },
        onSuccess: (data) => {
            queryClient.setQueryData<Notice[]>(['notices'],
                (old) => [...(old ?? []), data[0]]);
            reset();
        },
        onError: (error:Error) => {
            alert(error.message);
            reset();
        },
})
    const updateNoticeMutation = useMutation({
        mutationFn: async (editedTask: EditedNotice): Promise<Notice[]> => {
            const { data, error } = await supabase
                .from('notices')
                .update({ content: editedTask.content })
                .eq('id', editedTask.id)
                .select();
            if (error) {
                throw new Error(error.message);
            }
            return data;
        },
        onSuccess: (res,variables) => {
            queryClient.setQueryData<Notice[]>(['notices'], (old) =>
                old?.map((notice) => {
                    if (notice.id === variables.id) {
                        return { ...notice, content: res[0].content };
                    }
                    return notice;
                })
            );
            reset();
        },
        onError: (error: Error) => {
            alert(error.message);
            reset();
        }
    })
    const deleteNoticeMutation = useMutation({
        mutationFn: async (id: string): Promise<Notice[]> => {
            const { data, error } = await supabase
                .from('notices')
                .delete()
                .eq('id', id)
                .select();
            if (error) {
                throw new Error(error.message);
            }
            return data;
        },
        onSuccess: (_, variables) => {
            queryClient.setQueryData<Notice[]>(['notices'], (old) =>
                old?.filter((notice) => notice.id !== variables)
            );
        },
        onError: (error: Error) => {
            alert(error.message);
        }
    })
    return {
        createNoticeMutation,
        updateNoticeMutation,
        deleteNoticeMutation,
    };
}