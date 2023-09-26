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

export default function Home(props) {

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [style, _] = useState(null);

  const darkMode = {
    backgroundColor: "black",
    color: "white"
  }
  
  const lightMode = {
    backgroundColor: "white",
    color: "black"
  }

  const main = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: spacing.spacing8,
  }

  const navbar = {
    width: "100%",
    padding: `${spacing.spacing16} 0px`
  }

  return (
    <div style={isDarkMode ? darkMode : lightMode}>
      <Head>
        <title>Cooking Blog</title>
      </Head>
      <div style={main}>
          <div style={navbar}>
            <Navbar onDarkModeToggle={isDarkMode => setIsDarkMode(isDarkMode)}/>
          </div>
        <div>
          <Main posts={props.posts}/>
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