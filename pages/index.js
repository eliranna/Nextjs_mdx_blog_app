'use client'

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Head from 'next/head';
import Link from 'next/link';
import {useState} from 'react'

const posts = [
  {
    title: <span>
      01.09.24: Founding an academic course for Reichman University: Artificial Intelligence in the Socio-Ecological Sphere (5318)
    </span>,
    type: 'post',
    desc: <span>
      This year I will join the faculty of Reichman University as a lecturer to establish new academic course. The course will be included in the mandatory curriculum for the bachelor's degree in the integrated track for Sustainability and Government. The course challenges learners to fundamentally address the question: <i>Can artificial intelligence promote a human future that is equitable and sustainable? </i> <a href="posts/ai-in-socio-ecological-sphere-course">Read the note</a>.
    </span>,
  },
  {
    title: 'Lacture: Life as a contradiction',
    type: 'post',
    desc: <span>
      Substance dualism is a pivotal concept in the realm of metaphysics, asserting the existence of two distinct types of substances: minds (mental substances) and bodies (material substances). According to this thesis, human beings are composite entities, each consisting of a mind and a body, both of which are independent entities in their own right. This view stands in stark opposition to monistic theories, which argue that all things are composed of a single type of substance. <a href="posts/ai-in-socio-ecological-sphere-course">Read the note</a>.
    </span>
  }
]

export default function Home() {

  const [state, setState] = useState("Blog")

  const SectionLink = ({section}) => (
    <div onClick={() => setState(section)} className='cursor-pointer border-b border-white hover:border-black transition-all' style={{
      borderBottom: (state === section) && '1px solid black' 
    }}>{section}</div>
  )

  console.log(posts)

  return (
    <div>
      <Head>
          <title>Eliran Natan's Philosophy Notes</title>
      </Head>
      <div className='flex flex-col justify-center gap-12 my-28'>
          <div className='flex justify-center'>
              <div className='flex justify-center flex-col gap-16'>
                  <div className='flex flex-row justify-between'>
                      <div className='small-caps tracking-widest text-xl'>
                          <span>Eliran Natan</span>
                      </div>
                      <div className='text-right italic flex'>
                          <span className='max-w-sm'> 
                            Philosophy Research Student and Lecturer at Tel Aviv University and Reichman University.
                          </span>
                      </div>
                  </div>
                  <div className='max-w-2xl'>
                    <img src="https://res.cloudinary.com/dfdk4g2pj/image/upload/v1725459446/sara_28738_close_up_of_white_detailed_statue_of_upper_body_of_a_2e9de4bf-8be2-4053-9de1-4f9f6e1b0a87_1_nwjdg0.png"/>
                  </div>
                  <div className='flex flex-col justify-center gap-16'>
                      <div className='text-center small-caps tracking-widest text-md flex justify-center gap-12'>
                          <SectionLink section="Blog"/>
                          <div className='text-xs flex flex-col justify-center'>&#9702;</div>
                          <SectionLink section="Writings"/>
                      </div>
                  </div>
                  <div className='flex flex-col'>
                    <div className='flex flex-col gap-6 justify-center items-center transition-opacity'>
                      <div className='flex flex-col max-w-lg justify-center items-center gap-16'>
                        {posts.filter(post => state === 'Blog' ? post.type === 'post' : post.type === 'article').map(post => (
                          <div className='flex flex-col gap-10'>
                            <div className='flex flex-col gap-6'>
                            <div className='text-center text-xs'>
                                {post.date}
                              </div>
                              <div className='text-center text-md font-semibold'>
                                {post.title}
                              </div>
                              <div className='text-center text-md'>
                                {post.desc}
                              </div>
                            </div>
                            {post.image && (
                              <div>
                                <img src={post.image}/>
                              </div>
                            )}
                          </div>

                        ))}
                        {posts.filter(post => state === 'Blog' ? post.type === 'post' : post.type === 'article').length === 0 && (
                          <div>
                            Nothing to show yet.
                          </div>
                        )}                        
                      </div>
                    </div>
                  </div>
              </div>
          </div>
          <div>
            {false && <div className='flex justify-center text-xs'>
            © {new Date().getFullYear()} Eliran Natan. All rights reserved. Art is AI-generated.
            </div>}
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