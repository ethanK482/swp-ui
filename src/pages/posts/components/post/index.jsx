/* eslint-disable react/prop-types */
import { Avatar, Image } from "antd"
import PostStyle from "./PostStyle"
import formatDate from "../../../../helpers/formatDate"
import Report from "../../../../components/report";
const Post = ({ post, author }) => {
    return <PostStyle>
        <div className="post">
            <div className="post_info justify-between">
                <div className="flex items-center">
                    <Avatar size={40} src={author.avatarUrl} />
                    <div className="ml-2">
                        <p>{author.fullName}</p>
                        <span>{formatDate(new Date(post.createdAt))}</span>
                    </div>
                </div>
                <Report resourceType={"post"} resourceId={post?.id} />
            </div>



            <div className="post_content">
                <p className="mb-5">{post.content}</p>
                <Image preview={false} width={"100%"} src={post.file_url} />
            </div>
        </div>
    </PostStyle>
}
export default Post;