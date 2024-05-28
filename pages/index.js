'use client'

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Head from 'next/head';
import Link from 'next/link';
import {useState} from 'React'

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

const reviews = []

export default function Home(props) {

  const [state, setState] = useState()

  const SectionLink = ({section}) => (
    <div onClick={() => setState(section)} className='cursor-pointer border-b border-white hover:border-black transition-all' style={{
      borderBottom: (state === section) && '1px solid black' 
    }}>{section}</div>
  )

  return (
    <div>
      <Head>
          <title>Eliran Natan's Philosophy Notes</title>
      </Head>
      <div className='flex flex-col justify-center gap-12 mt-28 scale-[1.1]'>
          <div className='text-center italic text-3xl flex justify-center'>
              <img src="/assets/greek.png" className='w-[60px]'/>
          </div>
          <div className='flex justify-center'>
              <div className='flex justify-center flex-col gap-16'>
                  <div className='flex flex-col justify-center gap-6'>
                      <div className='text-center small-caps tracking-widest text-xl'>
                          <span>Eliran Natan</span>
                      </div>
                      <div className='text-center italic flex justify-center w-full'>
                          <span className='max-w-sm'> 
                              Teaching Philosophy & Computer Science. Graduate Student in Philosophy at Tel Aviv University.
                          </span>
                      </div>
                  </div>
                  <div className='flex flex-col justify-center gap-16'>
                      <div className='text-center small-caps tracking-widest text-md flex justify-center gap-12'>
                          <SectionLink section="Writings"/>
                          <div className='text-xs flex flex-col justify-center'>&#9702;</div>
                          <SectionLink section="Reviews"/>
                      </div>
                  </div>
                  <div className='relative'>
                    <div className='flex flex-col gap-6 transition-opacity absolute top-0 right-0 left-0
                    ' style={{
                      opacity: state === 'Writings' ? '1' : '0'
                    }}>
                      <div className='flex justify-center uppercase text-xs tracking-widest'>
                        Topics
                      </div>
                      <div className='flex flex-col gap-2 cursor-pointer'>
                        {courses.map(course => (
                            <Link className='text-center text-lg italic font-semibold' href={course.link}>
                              {course.title}
                            </Link>
                        ))}
                      </div>
                    </div>

                    <div className='flex flex-col gap-6 transition-opacity absolute top-0 right-0 left-0' style={{
                      opacity: state === 'Reviews' ? '1' : '0'
                    }}>
                      <div className='flex justify-center uppercase text-xs tracking-widest'>
                        No reviews yet
                      </div>
                      <div className='flex flex-col gap-2 cursor-pointer'>
                        {reviews.map(review => (
                            <Link className='text-center text-md italic font-semibold' href={review.link}>
                              {review.title}
                            </Link>
                        ))}
                      </div>
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