/* eslint-disable react/prop-types */
import { Button, Form, Image, Input, Modal, notification } from "antd";
import useAllUser from "../../../../hook/user/useAllUser";
import formatDate from "../../../../helpers/formatDate";
import useUserInfo from "../../../../hook/user/useUserInfo";
import { useEffect, useState } from "react";
import { SHOW_COMMENT_NUM } from "../../../../common/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../../api/http";
import useToken from "../../../../hook/user/useToken";
import useIsLogin from "../../../../hook/user/useIsLogin";
import { useForm } from "antd/es/form/Form";
const Comment = ({ comments, postId }) => {
  const token = useToken();
  const isLogin = useIsLogin();
  const queryClient = useQueryClient();
  const [numberCommentShow, setNumberCommentShow] = useState(SHOW_COMMENT_NUM);
  const [imageFile, setImageFile] = useState();

  const handleChangeImage = (info) => {
    const file = info.files[0];
    if (!file.type.includes("image")) {
      notification.error({ message: "Please, just upload image in comment" });
      setImageFile(null);
    } else {
      setImageFile(info.files[0]);
    }
  };

  const commentData = comments.slice(0, numberCommentShow);
  const users = useAllUser();
  const userInfo = useUserInfo();
  const getUserById = (userId) => users?.find((user) => user.id == userId);
  const isOwnerComment = (comment) => comment.userId == userInfo?.id;
  const commentMutation = useMutation({
    mutationFn: (formData) => {
      return api.post("/post/comment", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
    },
  });
  const deleteCommentMutation = useMutation({
    mutationFn: ({ commentId }) => {
      return api.delete(`/delete-comment/${commentId}`, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
    },
  });
  const handleComment = ({ content }) => {
    const formData = new FormData();
    formData.append("content", content);
    formData.append("file", imageFile);
    formData.append("postId", postId);
    commentMutation.mutate(formData, {
      onSuccess() {
        queryClient.invalidateQueries("posts");
      },
    });
  };
  const [form] = useForm();
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [editComment, setEditComment] = useState();
  useEffect(() => {
    form.setFieldsValue(editComment);
  }, [editComment]);
  const handleDeleteComment = () => {
    deleteCommentMutation.mutate(
      { commentId: deleteId },
      {
        onSuccess() {
          queryClient.invalidateQueries("posts");
        },
      }
    );
    setIsShowDeleteModal(false);
  };
  const handleCancelDeleteComment = () => {
    setIsShowDeleteModal(false);
  };
  const handleCancelEditComment = () => {
    setIsShowEditModal(false);
  };

  const handleSetDeleteComment = (id) => {
    setDeleteId(id);
    setIsShowDeleteModal(true);
  };
  const handleSetEditComment = (comment) => {
    setEditComment(comment);
    setIsShowEditModal(true);
  };
  return (
    <section className="bg-white  py-8 lg:py-16 antialiased">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 ">
            Discussion (20)
          </h2>
        </div>
        {isLogin && (
          <Form onFinish={handleComment} layout="vertical">
            <Form.Item name="content" rules={[{ required: true }]}>
              <Input.TextArea placeholder="enter your comment" />
            </Form.Item>
            <Form.Item label="Image">
              <Input
                onChange={(e) => handleChangeImage(e.target)}
                type="file"
              />
            </Form.Item>
            <Form.Item style={{ textAlign: "right" }}>
              <Button
                loading={commentMutation.isPending}
                type="primary"
                htmlType="submit"
              >
                Comment
              </Button>
            </Form.Item>
          </Form>
        )}
        {commentData.map((comment) => {
          const { fullName, avatarUrl } = getUserById(comment.userId);
          return (
            <article
              key={comment.id}
              className="p-6 text-base bg-white border-t border-gray-200  "
            >
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 text-sm text-gray-900  font-semibold">
                    <img
                      className="mr-2 w-6 h-6 rounded-full"
                      src={avatarUrl}
                      alt="user"
                    />
                    {fullName}
                  </p>
                  <p className="text-sm text-gray-600 ">
                    <time dateTime="2022-06-23" title="June 23rd, 2022">
                      {formatDate(new Date(comment.createdAt))}
                    </time>
                  </p>
                </div>
              </footer>
              <p className="text-gray-500 ">{comment.content}</p>
              {comment.fileUrl && <Image width={200} src={comment.fileUrl} />}
              {isOwnerComment(comment) && (
                <div className="flex justify-end gap-2">
                  {" "}
                  <Button onClick={() => handleSetEditComment(comment)}>
                    Edit
                  </Button>{" "}
                  <Button
                    onClick={() => handleSetDeleteComment(comment.id)}
                    danger
                  >
                    Delete
                  </Button>
                </div>
              )}
            </article>
          );
        })}
        {comments.length > SHOW_COMMENT_NUM && (
          <div className="flex justify-end">
            {numberCommentShow == SHOW_COMMENT_NUM ? (
              <button
                onClick={() => setNumberCommentShow(comments.length)}
                className="font-bold hover:text-[blue]"
              >
                Show more
              </button>
            ) : (
              <button
                onClick={() => setNumberCommentShow(SHOW_COMMENT_NUM)}
                className="font-bold hover:text-[blue]"
              >
                Show less
              </button>
            )}
          </div>
        )}
      </div>
      <Modal
        title="Delete Comment"
        open={isShowDeleteModal}
        onOk={handleDeleteComment}
        confirmLoading={deleteCommentMutation.isPending}
        onCancel={handleCancelDeleteComment}
      >
        <p>Are you sure to delete this comment</p>
      </Modal>
      <Modal
        title="Edit Comment"
        open={isShowEditModal}
        onOk={handleDeleteComment}
        confirmLoading={deleteCommentMutation.isPending}
        onCancel={handleCancelEditComment}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="content" rules={[{ required: true }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Image">
            <Input onChange={(e) => handleChangeImage(e.target)} type="file" />
          </Form.Item>
          <Form.Item style={{ textAlign: "right" }}></Form.Item>
        </Form>
      </Modal>
    </section>
  );
};
export default Comment;
