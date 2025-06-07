import { NextPage } from "next"
import { LogoutIcon,StatusOnlineIcon, DocumentTextIcon } from "@heroicons/react/solid"
import { supabase } from "../utils/supabase"
import Layout from "../components/Layout"
import { TaskForm } from "../components/TaskForm"
import {TaskList} from "../components/TaskList"
import { NoticeForm } from "../components/NoticeForm"
import {NoticeList} from "../components/NoticeList"
import { useQueryClient } from "@tanstack/react-query"

  const Dashboard: NextPage = () => {
  const queryClient = useQueryClient()
  const signOut = () => {
    supabase.auth.signOut()
    queryClient.clear() // Clear the query cache on sign out
  }
  return (
      <Layout title="Dashboard">
        <LogoutIcon
          className="mb-6 h-6 w-6 cursor-pointer text-blue-500"
          onClick={ signOut }
        />
        <div className="grid grid-cols-2 gap-40">
          <div>
            <div className="flex-justify-center my-3">
              <DocumentTextIcon className="h-8 w-8 text-blue-500"  />
            </div>
            <div>
              <TaskForm />
              <TaskList />
            </div>
          </div>
          <div>
            <div className="flex-justify-center my-3">
              <StatusOnlineIcon className="h-8 w-8 text-blue-500" />
            </div>
              <NoticeForm />
              <NoticeList />
          </div>
        </div>
      </Layout>
  )
}
export default Dashboard

