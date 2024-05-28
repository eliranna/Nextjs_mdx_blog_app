import Head from 'next/head';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import React from 'react';
import Link from 'next/link';
import Layout from './Layout';

function dashToTitle(dashString) {
    return dashString
        .split('-') // Split the string by dashes
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
        .join(' '); // Join the words with spaces
}

export default function CoursePage({topic, posts}) {
  return (
    <Layout>
      <Head>
          <title>Eliran Natan's Philosophy Notes</title>
      </Head>
        <div className='scale-[1.1]'>
            <div className='flex flex-col justify-center gap-16 mt-16'>
                <div className='flex flex-col gap-6'>
                    <div className='text-center small-caps tracking-widest text-sm'>
                        <span>Writings</span>
                    </div>
                    <div className='text-center italic text-3xl font-semibold'>
                        {dashToTitle(topic)}
                    </div>
                </div>
                <div className='flex flex-col gap-1 cursor-pointer'>
                    {posts.map(post => (
                        <Link key={post.slug} className='text-center text-lg italic' href={`/posts/${post.slug}`}>
                            {post.frontMatter.title}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    </Layout>
  )
}
