/* eslint-disable @next/next/no-img-element */
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Head from 'next/head';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import Layout from '../../components/Layout';
import { fontSize, spacing } from '../../style';

const components = { 
    p: (props) => <p className='text-lg text-justify indent-6 mb-0'>{props.children}</p>,
    h3: (props) => <div className='flex justify-center text-center mb-4 italic'><h2 className='text-xl text-justify font-semibold'>{props.children}</h2></div>
}

export default function Post(props) {

    const header = (
        <div className='flex flex-col gap-12 px-8'>
            <div className='flex flex-col gap-3'>
                {false && props.frontMatter.date && (
                    <div className='text-center text-xs tracking-widest opacity-60'>
                        {props.frontMatter.date}
                    </div>
                )}
                {props.frontMatter.title && (
                    <div className='text-3xl text-center leading-relaxed italic'>{props.frontMatter.title}</div>
                )}
            </div>
            {props.frontMatter.description && (
                <div className='text-lg italic text-justify'>{props.frontMatter.description}</div>
            )}
            {props.frontMatter.image && (
                <div>
                    <img alt="" src={props.frontMatter.image}/>
                </div>
            )}
            {!props.frontMatter.image && (
                <div className='flex justify-center tracking-[18px]'>
                    ...
                </div>
            )}
        </div>        
    )

    return (
        <Layout>
            {
                props.frontMatter && props.mdxSource && (
                    <div className='flex justify-center'>
                        <Head>
                            <title>{props.frontMatter.title}</title>
                        </Head>
                        <div className='flex flex-col gap-16 max-w-2xl mt-10'>
                            {(props.frontMatter.title || props.frontMatter.description) && header}
                            <div className=' px-8'>
                                <MDXRemote {...props.mdxSource} components={components} />
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
        mdxOptions: { development:  process.env.NODE_ENV === 'development' },
      });
    return {
        props:{
            frontMatter:data,
            slug,
            mdxSource
        }
    }
}