import Head from 'next/head';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import CoursePage from '../../components/CoursePage'

export default function Home({posts}) {
  console.log(posts[0].frontMatter.topic)
  return <CoursePage topic={'philosophy-of-the-mind'} posts={posts.filter(post => post.frontMatter.topic==='philosophy-of-the-mind')}/>
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