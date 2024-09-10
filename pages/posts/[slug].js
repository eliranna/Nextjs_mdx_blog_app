import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Head from 'next/head';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import Layout from '../../components/Layout';
import { fontSize, spacing } from '../../style';

export default function Post(props) {
    return (
        <Layout>
            {
                props.frontMatter && props.mdxSource && (
                    <div className='flex justify-center'>
                        <Head>
                            <title>{props.frontMatter.title}</title>
                        </Head>
                        <div className='flex flex-col gap-20 max-w-2xl mt-10'>
                            {(props.frontMatter.title || props.frontMatter.description) && 
                            (<div className='flex flex-col gap-12'>
                                <div className='text-center text-xs tracking-widest opacity-60'>
                                    {props.frontMatter.date}
                                </div>
                                <div className='text-3xl text-center leading-relaxed'>{props.frontMatter.title}</div>
                                <div className='text-lg italic text-center'>{props.frontMatter.description}</div>
                            </div>)}
                            <div className='text-justify'>
                                <MDXRemote {...props.mdxSource} />
                            </div>
                        </div>
                    </div>
                )
            }
            
        </Layout>
    )
}


export async function getStaticPaths(){
    const files = fs.readdirSync(path.join("posts"));
    const paths = files.map((file) => {
        return {
            params:{
                slug:file.replace(".mdx","")
            }
        }
    });
    return {
        paths,
        fallback:false
    }
}

export async function getStaticProps({params:{slug}}){
    const fileData = fs.readFileSync(path.join("posts",slug+'.mdx'),'utf-8');
    const {data,content} = matter(fileData);
    const mdxSource = await serialize(content, {
        mdxOptions: { development: false },
      });
    return {
        props:{
            frontMatter:data,
            slug,
            mdxSource
        }
    }
}