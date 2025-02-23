/* eslint-disable @next/next/no-img-element */
'use client'

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Head from 'next/head';
import Link from 'next/link';
import {useState} from 'react'

const PUBLIC = false;

const imagesAbove = false;
const showImagesOfPosts = false;
const coverPhoto = 'https://res.cloudinary.com/dfdk4g2pj/image/upload/v1730981425/image_1_wpxwpa.png'


export default function Home({posts}) {

  const [state, setState] = useState("Blog")

  const SectionLink = ({section}) => (
    <div onClick={() => setState(section)} className='cursor-pointer border-b border-white lg:hover:border-black transition-all' style={{
      borderBottom: (state === section) && '1px solid black' 
    }}>{section}</div>
  )

  return PUBLIC && (
    <div dir="rtl" style={{fontFamily: "Frank Ruhl Libre", textAlign:'right', fontWeight:'400'}}>
      <Head>
          <title>Eliran Natan</title>
      </Head>
      <div className='flex flex-col justify-center gap-12 my-28 px-8 justify-items-center	content-center items-center'>
          <div className='flex justify-center max-w-3xl justify-self-center'>
              <div className='flex justify-center flex-col gap-20'>
                  <div className='flex flex-col justify-between gap-2'>
                      <div className='small-caps tracking-[3px] text-2xl text-center font-semibold'>
                          <span>אלירן נתן</span>
                      </div>
                      <div className='text-right flex justify-center text-md tracking-[1.8px] font-medium'>
                          <span className='max-w-sm text-center'> 
                              תלמיד מחקר לפילוסופיה ומורה בחוג למדעי הרוח של אונ׳ תל-אביב. מרצה לפילוסופיה באוניברסיטת רייכמן. 
                          </span>
                      </div>
                  </div>
                  {coverPhoto && (
                    <div className='flex flex-col gap-3'>
                      <div>
                        <img alt="" src={coverPhoto}/>
                      </div>
                      <div>
                        <span className='font-semibold'>תמונה:</span> {" "}
                        <span>מבוא לתולדות הפילוסופיה של הגל</span>
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
                    {posts.filter(post => post.frontMatter.public).map((post, index) => (
                      <div key={`story-${index} w-full`} className='flex flex-col gap-6 mb-6'>
                        <div className='border-t border-black'/>
                        <div className='text-2xl font-semibold'>
                        <Link href={`posts/${post.slug}`} style={{textDecoration:'none'}}>
                            {post.frontMatter.titleHeb}
                        </Link>
                        </div>
                        <div className='text-xl font-medium text-justify'>
                          {post.frontMatter.descriptionHeb}
                        </div>
                      </div>
                    ))}



{false && (         <div className='flex flex-col gap-6 justify-center items-center transition-opacity'>
                      <div className={`flex flex-col justify-center items-center ${showImagesOfPosts ? 'gap-24': 'gap-12'}`}>
                        {posts.map((post, index) => (
                          <div key={`story-${index}`} className={`flex ${imagesAbove ? 'flex-col-reverse': 'flex-col'} gap-10 justify-center items-center`}>
                            <div className='flex flex-col gap-4 max-w-lg '>
                              <div className='flex flex-col gap-2'>
                                <div className='text-center text-xs tracking-widest opacity-60'>
                                  {post.frontMatter.date}
                                </div>
                                <div className='text-center text-xl font-semibold italic'>
                                  <Link href={`posts/${post.slug}`} style={{textDecoration:'none'}}>
                                      {post.frontMatter.title}
                                  </Link>
                                </div>
                              </div>
                              <div className='text-center text-md md:text-md'>
                                {post.frontMatter.description}
                              </div>
                            </div>
                            {post.frontMatter.image && showImagesOfPosts &&  (
                              <div className='max-w-sm'>
                                <Link href={`posts/${post.slug}`}>
                                  <img alt={""} src={post.frontMatter.image}/>
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
                    </div>)}
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