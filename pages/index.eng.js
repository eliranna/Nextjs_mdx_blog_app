/* eslint-disable @next/next/no-img-element */
'use client'

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Head from 'next/head';
import Link from 'next/link';
import {useState} from 'react'

const imagesAbove = false;
const showImagesOfPosts = false;
const coverPhoto = null;
const lock = false;

export default function Home({posts}) {

  const [state, setState] = useState("Blog")

  const SectionLink = ({section}) => (
    <div onClick={() => setState(section)} className='cursor-pointer border-b border-white lg:hover:border-black transition-all' style={{
      borderBottom: (state === section) && '1px solid black' 
    }}>{section}</div>
  )

  return lock ? <div></div> : (
    <div>
      <Head>
          <title>Eliran Natan</title>
      </Head>
      <div className='flex flex-col justify-center gap-12 my-28 px-8'>
          <div className='flex justify-center'>
              <div className='flex justify-center flex-col gap-28'>
                  <div className='flex flex-col justify-between gap-4'>
                      <div className='small-caps tracking-widest text-xl text-center'>
                          <span>Eliran Natan</span>
                      </div>
                      <div className='text-right italic flex justify-center'>
                          <span className='max-w-sm text-center text-md'> 
                              Philosophy Research Student at Tel Aviv University, Lecturer at Tel Aviv University and Reichman University.
                          </span>
                      </div>
                  </div>
                  { coverPhoto && (
                    <div className='max-w-2xl flex flex-col gap-6 text-center justify-center items-center'>
                      <div>
                        <img alt="" src={coverPhoto}/>
                      </div>
                      <div className='max-w-lg'>
                        <div>
                          <span className='italic'>
                            {'"'}
                            Nothing in the world—indeed nothing even beyond the world—can possibly be conceived which could be called good without qualification except a 
                            {" "}
                            <span className='small-caps font-bold'>good will</span>.
                            {'"'} {" "} 
                            <span className='small-caps'>
                            — Immanuel Kant, Groundwork for the Metaphysic of Morals (1785)
                            </span>
                          </span>
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
                      <div className={`flex flex-col justify-center items-center ${showImagesOfPosts ? 'gap-24': 'gap-16'}`}>
                        {posts.filter(post => post.frontMatter.public).map((post, index) => (
                          <div key={`story-${index}`} className={`flex ${imagesAbove ? 'flex-col-reverse': 'flex-col'} gap-10 justify-center items-center`}>
                            <div className='flex flex-col gap-4 max-w-lg '>
                              <div className='flex flex-col gap-2'>
                                <div className='text-center text-xs tracking-widest opacity-60'>
                                  {post.frontMatter.date}
                                </div>
                                <div className='text-center text-xl font-semibold'>
                                  {post.frontMatter.link ? (
                                  <Link href={`posts/${post.slug}`} style={{textDecoration:'none'}}>
                                      {post.frontMatter.title}
                                  </Link>) :
                                    (
                                      <div>
                                        {post.frontMatter.title}
                                      </div>
                                    )
                                  }
                                </div>
                              </div>
                              <div className='text-center text-md md:text-md'>
                                {post.frontMatter.description} {post.frontMatter.link && <Link href={`posts/${post.slug}`} 
                                style={{textDecoration: 'underline'}}>Read more</Link>}
                              </div>
                            </div>
                            {post.frontMatter.image && showImagesOfPosts &&  (
                              <div className='max-w-lg'>
                                 {post.frontMatter.link ? (
                                      <Link href={`posts/${post.slug}`}>
                                          <img alt={""} src={post.frontMatter.image}/>
                                        </Link>) :
                                    (
                                      <div>
                                        <img alt={""} src={post.frontMatter.image}/>
                                      </div>
                                    )
                                  }

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