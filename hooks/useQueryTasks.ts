import { useQuery } from "@tanstack/react-query";
import { supabase } from "../utils/supabase";
import { Task } from "../types/types";

export const useQueryTasks = () => {
        const getTasks = async () => {
        const { data, error } = await supabase
            .from("todos")
            .select("*")
            .order("created_at", { ascending: true });
        if (error) throw new Error(error.message);
        return data;
    }
    /**Tanstack.Queryに保持されているErrorの型を使用 */
    /**useQueryはデータを取得するためのフックで、queryKeyでキャッシュを管理します。
     * queryFnはデータを取得する関数で、staleTimeはデータの新鮮さを管理します。
     */
    return useQuery<Task[], Error>({
        queryKey: ["todos"],
        queryFn: getTasks,
        staleTime: Infinity,
    })}