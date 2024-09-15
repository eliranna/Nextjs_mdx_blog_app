'use client'

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Head from 'next/head';
import Link from 'next/link';
import {useState} from 'react'

const withCoverImage = false;

export default function Home({posts}) {

  const [state, setState] = useState("Blog")

  const SectionLink = ({section}) => (
    <div onClick={() => setState(section)} className='cursor-pointer border-b border-white lg:hover:border-black transition-all' style={{
      borderBottom: (state === section) && '1px solid black' 
    }}>{section}</div>
  )

  return (
    <div>
      <Head>
          <title>Eliran Natan</title>
      </Head>
      <div className='flex flex-col justify-center gap-12 my-28 px-8'>
          <div className='flex justify-center'>
              <div className='flex justify-center flex-col gap-28'>
                  <div className='flex flex-col justify-between gap-2'>
                      <div className='small-caps tracking-widest text-xl text-center'>
                          <span>Eliran Natan</span>
                      </div>
                      <div className='text-right italic flex justify-center'>
                          <span className='max-w-sm text-center'> 
                              Philosophy Research Student at Tel Aviv University, Lecturer at Tel Aviv University and Reichman University.
                          </span>
                      </div>
                  </div>
                  {withCoverImage && (
                    <div className='max-w-2xl flex flex-col space-y-2'>
                      <div>
                        <img src="https://res.cloudinary.com/dfdk4g2pj/image/upload/v1725459446/sara_28738_close_up_of_white_detailed_statue_of_upper_body_of_a_2e9de4bf-8be2-4053-9de1-4f9f6e1b0a87_1_nwjdg0.png"/>
                      </div>
                      <div className='flex justify-center'>
                        <div className='flex justify-center text-sm italic text-center max-w-xl'>
                        Dionysus, the Greek god of wine, ecstasy, and chaos, represents Nietzsche's ideal of embracing the ecstatic aspects of existence.
                        </div>
                      </div>
                    </div>
                  )}
                  {false && (
                    <div className='flex flex-col my-8'>
                      <div className='text-center small-caps tracking-widest text-md flex justify-center gap-12'>
                          <SectionLink section="Blog"/>
                          <div className='text-xs flex flex-col justify-center'>&#9702;</div>
                          <SectionLink section="Writings"/>
                      </div>
                    </div>
                  )}
                  <div className='flex flex-col'>
                    <div className='flex flex-col gap-6 justify-center items-center transition-opacity'>
                      <div className='flex flex-col justify-center items-center gap-20'>
                        {posts.map(post => (
                          <div className='flex flex-col gap-10 justify-center items-center'>
                            <div className='flex flex-col gap-4 max-w-lg '>
                              <div className='flex flex-col gap-2'>
                                <div className='text-center text-xs tracking-widest opacity-60'>
                                  {post.frontMatter.date}
                                </div>
                                <div className='text-center text-md font-semibold'>
                                  <Link href={`posts/${post.slug}`} style={{textDecoration:'none'}}>
                                      {post.frontMatter.title}
                                    </Link>
                                </div>
                              </div>
                              <div className='text-center text-md md:text-md'>
                                {post.frontMatter.description}
                              </div>
                            </div>
                            {post.frontMatter.image && (
                              <div className='max-w-lg'>
                                <Link href={`posts/${post.slug}`}>
                                  <img src={post.frontMatter.image}/>
                                </Link>
                              </div>
                            )}

                          </div>
                          

                        ))}
                        {posts.filter(post => state === 'Blog' ? post.frontMatter.type === 'post' : post.frontMatter.type === 'article').length === 0 && (
                          <div>
                            Nothing to show yet.
                          </div>
                        )}                        
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