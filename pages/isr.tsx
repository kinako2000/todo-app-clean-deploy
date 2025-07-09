import Link from 'next/link'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { GetStaticProps } from 'next'

import { supabase } from '../utils/supabase'
import { Task, Notice } from '../types/types'
import Layout from '../components/Layout'

type StaticProps = {
    tasks: Task[]
    notices: Notice[]
    }

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
    console.log('getStaticProps/isr invoked')
    try {
    const { data: tasks,  error: tasksError} = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: true })

    const { data: notices,  error: noticesError} = await supabase
        .from('notices')
        .select('*')
        .order('created_at', { ascending: true })

        if (tasksError) console.error('Tasks fetch error:', tasksError)
        if (noticesError) console.error('Notices fetch error:', noticesError)

            return {
                props: {
                    tasks: Array.isArray(tasks) ? tasks : [],
                    notices: Array.isArray(notices) ? notices : [],
                },
                revalidate: 5,
                }
    }

catch (error) {
    console.error('Error fetching data:', error)
    return { props: { tasks: [], notices: [] }, revalidate: 5 }
}
}
const Isr: NextPage<StaticProps> = ({ tasks, notices } ) => {
    const router = useRouter()
    return (
        <Layout title="ISR">
        <p className="mb-3 text-indigo-500">ISR</p>
        <ul className="mb-3">
        {tasks?.length > 0 ? (
    tasks.map((task) => (
    <li key={task.id}>
        <p className="text-lg font-extrabold">{task.title}</p>
    </li>
    ))
) : (
    <li>No tasks available</li>
)}
        </ul>
        <ul className="mb-3">
        {notices?.length > 0 ? (
    notices.map((notice) => (
    <li key={notice.id}>
        <p className="text-lg font-extrabold">{notice.content}</p>
    </li>
    ))
) : (
    <li>No notices available</li>
)}
        </ul>
            <Link href="/ssr" prefetch={false}>
                <a className="my-3 text-xs"> Link to ssr</a>
            </Link>
            <button className="mb-3 text-xs" onClick={() => router.push('/ssr')}>
                Route to ssr
            </button>
        </Layout>
    )
}

export default Isr


