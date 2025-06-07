import {  FC, useEffect, useState } from "react"
import { supabase } from "../utils/supabase"
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid"
import useStore from "../store"
import { useMutateNotice } from "../hooks/useMutateNotice"
import { Notice } from "../types/types"


export const NoticeItem:FC<Omit<Notice, 'created_at'>> = ({
    id,
    content,
    user_id,
}) => {
const [ userId, setUserId ] = useState<string | undefined>("")
const update = useStore((state) => state.updateEditedNotice)
const { deleteNoticeMutation } = useMutateNotice()
useEffect(() => {
    setUserId(supabase.auth.user()?.id)
}, [])
  return (
    <li className="my-3 text-lg font-extrabold">
<span>{content}</span>
{userId === user_id && (
    <div className="float-right ml-20 flex">
    <PencilAltIcon
      className="h-5 w-5 text-blue-500 cursor-pointer"
      onClick={() => update({ id: id, content: content })}
    />
    <TrashIcon
      className="h-5 w-5 text-blue-500 cursor-pointer"
      onClick={() => deleteNoticeMutation.mutateAsync(id)}
    />
  </div>
    )}

    </li>
  )
}

export default NoticeItem
