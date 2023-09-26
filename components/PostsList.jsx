import Link from 'next/link';
import { spacing } from '../style';
import PostCard from './PostCard';

export default function PostsList({posts}) {

    const wrapper = {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        gap: spacing.spacing16
    }

    return (
        <div style={wrapper}>
            {posts.map((post,index) => (
                <Link href={`/posts/${post.slug}`} key={index}>
                    <PostCard post={post} />
                </Link>
            ))}
        </div>
    )
}
