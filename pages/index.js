'use client'

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar'
import Main from '../components/Main';
import { spacing } from '../style';
import Layout from '../components/Layout';

export default function Home(props) {
  return (
    <Layout>
      <Main posts={props.posts}/>
    </Layout>
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