import Link from 'next/link';
import { spacing } from '../style';
import PostCard from './PostCard';
import Filters from './Filters';
import { useState } from 'react';

export default function PostsList({posts}) {

    const [selectedFilter, setSelectedFilter] = useState('BASICS')

    const wrapper = {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        gap: spacing.spacing16
    }

    const filtersPane = {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        gap: spacing.spacing16
    }

    const filters = [ 
        {
            id: 'BASICS',
            caption: 'The Basics'
        }, 
        {
            id: 'STEMP',
            caption: 'STEMP Method'
        },
        {
            id: 'ADVANCED',
            caption: 'In Depth'
        }, 
        {
            id: 'ALL',
            caption: 'All'
        },
    ]

    return (
        <div style={wrapper}>
            <div style={filtersPane}>
                <Filters filters={filters} selectedFilter={selectedFilter} onFilterSelect={(id) => setSelectedFilter(id)}/>
            </div>
            {posts.filter(post => selectedFilter === 'ALL' ? true : post.frontMatter.topic === selectedFilter).map((post,index) => (
                <Link href={`/posts/${post.slug}`} key={index}>
                    <PostCard post={post} />
                </Link>
            ))}
        </div>
    )
}
