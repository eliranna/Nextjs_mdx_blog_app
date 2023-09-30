import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Head from 'next/head';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import Layout from '../../components/Layout';
import { fontSize, spacing } from '../../style';

export default function Post(props) {

    const wrapper = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
    }

    const title = {
        textAlign: "left",
        fontWeight: 300,
        margin: "0px"
    }

    const description = {
        textAlign: "left",
        fontWeight: 200,
        margin: "0px",
    }

    const article = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        maxWidth: "650px",
        gap: spacing.spacing3
    }

    return (
        <Layout>
            {
                props.frontMatter && props.mdxSource && (
                    <div style={wrapper}>
                        <Head>
                            <title>{props.frontMatter.title}</title>
                        </Head>
                        <div style={article}>
                            <div>
                                <h4 style={title}>{props.frontMatter.title}</h4>
                            </div>
                            <div>
                                <p style={description}>{props.frontMatter.description}</p>
                            </div>
                            <div>
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
    const mdxSource = await serialize(content);
    return {
        props:{
            frontMatter:data,
            slug,
            mdxSource
        }
    }
}