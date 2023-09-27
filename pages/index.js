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

  useEffect(() => {
    document.body.style.backgroundColor = isDarkMode ? '#111111' : 'white';
  }, [isDarkMode])

  const wrapper = {
      minHeight: "100vh"
  }

  const darkMode = {
    backgroundColor: "#111111",
    color: "white",
    transition: "all 0.5s"
  }
  
  const lightMode = {
    backgroundColor: "white",
    color: "#111111",
    transition: "all 0.5s"
  }

  const main = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: spacing.spacing4,
  }

  const navbar = {
    width: "100%",
    padding: `${spacing.spacing8} 0px`,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  }

  const footer = {
    width: "100%",
    padding: `${spacing.spacing16} 0px`,
  }

  const wrapperStyle = isDarkMode ? {...wrapper, ...darkMode} : {...wrapper, ...lightMode}

  return (
    <div style={wrapperStyle}>
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
      <div style={footer}>

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