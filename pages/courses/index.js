import Layout from "../../components/Layout"
import Head from 'next/head';
import Link from 'next/link';

const courses = [
  {
    title: 'Philosophy of the Mind',
    link: '/courses/philosophy-of-the-mind'
  }, 
  {
    title: 'Incompleteness and Intuition',
    link: '/courses/philosophy-of-the-mind'
  }
]

export default function Home(props) {
    return (
      <Layout>
        <Head>
            <title>Eliran Natan's Philosophy Notes</title>
        </Head>
        <div className='flex flex-col justify-center gap-12 mt-28'>
            <div className='text-center italic text-3xl flex justify-center'>
                Courses
            </div>
            <div className='flex justify-center'>
                <div className='flex justify-center flex-col gap-16'>
                    <div className='flex flex-col justify-center gap-16'>
                        <div className='flex flex-col gap-2 cursor-pointer'>
                            {courses.map(course => (
                                <Link className='text-center text-lg italic font-semibold' href={course.link}>
                                {course.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </Layout>
    )
  }