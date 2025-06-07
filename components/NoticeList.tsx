import { FC } from "react"
import { useQueryNotices } from "../hooks/useQueryNotices"
import { Spinner } from "./Spinner"
import { NoticeItem } from "./NoticeItem"

export const NoticeList: FC = () => {
  const { data: notices, isLoading, isError } = useQueryNotices()
  if (isLoading) return <Spinner />
  if (isError) return <div>Error loading notices</div>
  return (
    <ul className="my-2">
      {notices?.map((notice) => (
        <NoticeItem
        key={notice.id}
        id={notice.id}
        content={notice.content}
        user_id={notice.user_id}
        />
      ))}
    </ul>
  )
}


