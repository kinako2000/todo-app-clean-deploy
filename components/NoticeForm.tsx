import { FormEvent, FC } from "react"
import { supabase } from "../utils/supabase"
import useStore from "../store"
import { useMutateNotice } from "../hooks/useMutateNotice"

export const NoticeForm = () => {
  const { editedNotice } = useStore()
  const update = useStore((state) => state.updateEditedNotice)
  const { createNoticeMutation, updateNoticeMutation } = useMutateNotice()

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedNotice.id === "") {
      await createNoticeMutation.mutateAsync({
        content: editedNotice.content,
        user_id: supabase.auth.user()?.id,
      })
    } else {
      await updateNoticeMutation.mutateAsync({
        id: editedNotice.id,
        content: editedNotice.content,
      })}}
    return (
      <form  onSubmit={submitHandler}>
        <input type="text"
                className="my-2 border border-gray-300 rounded px-3 py-2 placeholder-gray-500 focus:outline-none focus:border-indigo-500 text-sm"
                placeholder="Notice Content"
                value={editedNotice.content}
                onChange={(e) => update({ id: editedNotice.id, content: e.target.value })}
                />
        <button type="submit" className="bg-indigo-600 text-white rounded px-3 py-2 hover:bg-indigo-700 font-medium"
                >{editedNotice.id ? "Update" : "Create"}
        </button>
      </form>
    )
}

 // フォームの送信ハンドラー
  // editedNoticeの内容を更新するための関数
  // createNoticeMutationとupdateNoticeMutationは、通知の作成と更新を行うためのフック// useMutateNoticeから取得した関数を使用して、通知の作成または更新を行います。
  // editedNotice.idが存在する場合は更新、存在しない場合は新規作成を行います。// supabase.auth.user()?.idは、現在のユーザーのIDを取得します。
  // createNoticeMutation.mutateAsyncは、非同期で通知を作成します。// updateNoticeMutation.mutateAsyncは、非同期で通知を更新します。