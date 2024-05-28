'use client'

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
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
    <div>
      <Head>
          <title>Eliran Natan's Philosophy Notes</title>
      </Head>
      <div className='flex flex-col justify-center gap-16 mt-36'>
          <div className='flex justify-center'>
              <div className='flex justify-center flex-col gap-32'>
                  <div className='flex flex-col justify-center max-w-sm gap-2'>
                      <div className='text-center small-caps tracking-widest text-lg'>
                          <span>Eliran Natan</span>
                      </div>
                      <div className='text-center italic'>
                          <span> 
                              Teaching Philosophy & Computer Science. Graduate Student in Philosophy at Tel Aviv University.
                          </span>
                      </div>
                      <div>
                      
                      </div>
                  </div>
                  <div className='flex flex-col justify-center max-w-sm gap-8'>
                      <div className='text-center uppercase tracking-widest text-xs'>
                          <span>Courses</span>
                      </div>
                      <div className='flex flex-col gap-1 cursor-pointer'>
                        {courses.map(course => (
                          <Link className='text-center text-lg' href={course.link}>
                            {course.title}
                          </Link>
                        ))}
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
}

// fetching the posts.
export async function getStaticProps(){
  let files = fs.readdirSync(path.join("posts"));
  files = files.filter(file => file.split('.')[1] == "mdx");
  const posts =  files.map(file => {
    const fileData = fs.readFileSync(path.join("posts",file),'utf-8');
    const {data} = matter(fileData);
    return {
      frontMatter:data,
      slug:file.split('.')[0],   
    }
  });
  return{
    props:{
      posts
    }
  }
}