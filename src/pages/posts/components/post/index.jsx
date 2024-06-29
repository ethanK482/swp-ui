/* eslint-disable react/prop-types */
import { Avatar, Image } from "antd";
import PostStyle from "./PostStyle";
import formatDate from "../../../../helpers/formatDate";
import Report from "../../../../components/report";
import { LikeOutlined, LikeFilled, CommentOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../../api/http";
import useUserInfo from "../../../../hook/user/useUserInfo";
import useIsLogin from "../../../../hook/user/useIsLogin";
import Comment from "../comments";
import useToken from "../../../../hook/user/useToken";
const Post = ({ post, author }) => {
  const token = useToken();
  const queryClient = useQueryClient();
  const isLogin = useIsLogin();
  const userInfo = useUserInfo();
  const likes = post.likes;
  const totalLike = likes.length;
  const comments = post.comments.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  const totalComment = comments.length;
  const isLiked = isLogin
    ? likes.some((like) => like.userId == userInfo?.id)
    : false;

  const likePostMutation = useMutation({
    mutationFn: (formData) => {
      return api.post("/post/like", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
    },
  });

  const likePostHandle = () => {
    if (isLogin) {
      const formData = new FormData();
      formData.append("postId", post.id);
      likePostMutation.mutate(formData, {
        onSuccess() {
          queryClient.invalidateQueries("posts");
        },
      });
    }
  };
  return (
    <PostStyle>
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
        <div>
          {!!totalLike && <span className="mr-1">{totalLike}</span>}
          {isLiked ? (
            <LikeFilled
              style={{ fontSize: "25px" }}
              className="text-[blue]"
              onClick={likePostHandle}
            />
          ) : (
            <LikeOutlined
              onClick={likePostHandle}
              style={{ fontSize: "25px" }}
              className="hover:text-[blue]"
            />
          )}
          {!!totalComment && <span className="mr-1  ml-2">{totalComment}</span>}
          <CommentOutlined
            style={{ fontSize: "25px" }}
            className="hover:text-[blue]"
          />
        </div>
        <Comment comments={comments} postId={post.id} />
        <></>
      </div>
    </PostStyle>
  );
};
export default Post;
