/* eslint-disable react/prop-types */
import { Avatar, Image } from "antd"
import PostStyle from "./PostStyle"
import formatDate from "../../../../helpers/formatDate"
const Post = ({post, author})=>{
    return <PostStyle>
        <div className="post">
            <div className="post_info">
                <Avatar size={40} src={author.avatarUrl}/>
                <div>
                    <p>{author.fullName}</p>
                    <span>{formatDate(new Date(post.created_at)) }</span>
                </div>
            </div>
            <div className="post_content">
                <p className="mb-5">{post.content}</p>
                <Image preview={false} width={"100%"} src={post.file_url}/>
            </div>
        </div>
    </PostStyle>
}
export default Post;