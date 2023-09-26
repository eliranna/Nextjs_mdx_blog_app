import Host from './Host'
import Link from 'next/link';
import PostsList from './PostsList';
import { spacing } from '../style';

export default function Main({posts}) {

    const wrapper = {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        gap: spacing.spacing24
    }

    const postsListPane = {
        display: "flex",
        justifyContent: "center",
    }

    const postsList = {
        maxWidth: "420px"
    }

    return (
        <div style={wrapper}>
            <div>
                <Host/>
            </div>
            <div style={postsListPane}>
                <div style={postsList}>
                    {posts.length > 0 ? <PostsList posts={posts}/> : (
                        <h2 className='font-sans text-3xl'>No posts yet</h2>
                    )}                
                </div>
            </div>
        </div>
    )
}
