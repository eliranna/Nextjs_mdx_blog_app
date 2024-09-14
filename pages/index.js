'use client'

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Head from 'next/head';
import Link from 'next/link';
import {useState} from 'react'

const withCoverImage = false;

const posts = [
  {
    title: <span>
      AI & Society: Founding a New Academic Course for Reichman University
    </span>,
    type: 'post',
    desc: <span>
      This year I will join the faculty of Reichman University as a lecturer to establish new academic course. The course challenges learners to fundamentally address the question: <i>Can artificial intelligence promote a human future that is equitable and sustainable? </i> <a href="posts/ai_and_society_course">Message to Students</a>.
    </span>,
    date: 'Sep 01, 2024',
    image: 'https://res.cloudinary.com/dfdk4g2pj/image/upload/t_s/v1726190063/powercrm_60677_The_Creation_of_Adam_in_the_style_of_Michelangel_66f7fa95-3751-4289-9857-84564e7573b2_far02a.png'
  },
  {
    title: 'Life as Contradiction: Upcoming Lecture at TAU',
    type: 'post',
    desc: <span>
      On August 7th, I will speak at the annual conference for research students in the Philosophy Department at Tel Aviv University. My lecture will address the Hegelian account of organism and explore how contemporary approaches in neuroscience can be interpreted as instantiations of dialectical principles. <a href="posts/life_as_contradiction">Read More</a>
    </span>,
    date: 'Jul 31, 2024',
    image: "https://res.cloudinary.com/dfdk4g2pj/image/upload/v1725459446/sara_28738_close_up_of_white_detailed_statue_of_upper_body_of_a_2e9de4bf-8be2-4053-9de1-4f9f6e1b0a87_1_nwjdg0.png"
  },
  {
    title: <span>
      How Kierkegaard Has Changed My Mind About Faith
    </span>,
    type: 'article',
    desc: <span>
      This year I will join the faculty of Reichman University as a lecturer to establish new academic course. The course challenges learners to fundamentally address the question: <i>Can artificial intelligence promote a human future that is equitable and sustainable? </i> <a href="posts/ai-in-socio-ecological-sphere-course">Read the note</a>.
    </span>,
    date: 'Sep 01, 2024',
    image: 'https://res.cloudinary.com/dfdk4g2pj/image/upload/v1726091626/kate_42327_Christian_woman_praying_1310_mystic_medieval_--v_6.1_2e3c52e9-55b6-40e5-bf00-c6e8efd95118_tzskug.png'
  },
  {
    title: <span>
      Life as Contradiction: The Hegelian Organisem
    </span>,
    type: 'article',
    desc: <span>
      This year I will join the faculty of Reichman University as a lecturer to establish new academic course. The course challenges learners to fundamentally address the question: <i>Can artificial intelligence promote a human future that is equitable and sustainable? </i> <a href="posts/ai-in-socio-ecological-sphere-course">Read the note</a>.
    </span>,
    date: 'Sep 01, 2024',
    image: 'https://res.cloudinary.com/dfdk4g2pj/image/upload/v1726274197/david_leitner_white_marble_sculpture_portrait_of_the_ai_--v_6.1_76bdf34a-b0f3-4573-9596-f00a08c5c3db_dxjgql.png'
  },
]

export default function Home() {

  const [state, setState] = useState("Blog")

  const SectionLink = ({section}) => (
    <div onClick={() => setState(section)} className='cursor-pointer border-b border-white hover:border-black transition-all' style={{
      borderBottom: (state === section) && '1px solid black' 
    }}>{section}</div>
  )

  return (
    <div>
      <Head>
          <title>Eliran Natan</title>
      </Head>
      <div className='flex flex-col justify-center gap-12 my-28'>
          <div className='flex justify-center'>
              <div className='flex justify-center flex-col gap-16'>
                  <div className='flex flex-col justify-between gap-2'>
                      <div className='small-caps tracking-widest text-xl text-center'>
                          <span>Eliran Natan</span>
                      </div>
                      <div className='text-right italic flex justify-center'>
                          <span className='max-w-sm text-center'> 
                            Philosophy Research Student and Lecturer at Tel Aviv University and Reichman University.
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
                  <div className='flex flex-col my-8'>
                      <div className='text-center small-caps tracking-widest text-md flex justify-center gap-12'>
                          <SectionLink section="Blog"/>
                          <div className='text-xs flex flex-col justify-center'>&#9702;</div>
                          <SectionLink section="Writings"/>
                      </div>
                  </div>
                  <div className='flex flex-col'>
                    <div className='flex flex-col gap-6 justify-center items-center transition-opacity'>
                      <div className='flex flex-col justify-center items-center gap-20'>
                        {posts.filter(post => state === 'Blog' ? post.type === 'post' : post.type === 'article').map(post => (
                          <div className='flex flex-col gap-10 justify-center items-center'>

                            <div className='flex flex-col gap-4 max-w-lg '>
                              <div className='flex flex-col gap-2'>
                                <div className='text-center text-xs tracking-widest opacity-60'>
                                  {post.date}
                                </div>
                                <div className='text-center text-md font-semibold'>
                                  {post.title}
                                </div>
                              </div>
                              <div className='text-center text-md'>
                                {post.desc}
                              </div>
                            </div>
                            {post.image && (
                              <div className='max-w-lg'>
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