import useAllDocuments from "../../../hook/documents/useAllDocument";
import { Button, Table, notification } from "antd";
import api from "../../../api/http";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAllTopic from "../../../hook/topic/useAllTopic";
import useAllUser from "../../../hook/user/useAllUser";
const ListPendingDocument = () => {
  const documents = useAllDocuments();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const topics = useAllTopic();
  const users = useAllUser();
  const getTopicNameById = (id) => topics?.find((topic) => topic.id == id).name;
  const getEmailById = (id) => users?.find((user) => user.id == id).email;
  const token = localStorage.getItem("token");
  const activeMutation = useMutation({
    mutationFn: ({ formData }) => {
      return api.put(`/document/active`, formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
    },
  });

  const handleActive = (documentId) => {
    const formData = new FormData();
    formData.append("documentId", documentId + "");
    activeMutation.mutate(
      { formData },
      {
        onSuccess() {
          notification.success({ message: "Successfully" });
          queryClient.invalidateQueries("documents");
        },
      }
    );
  };
  const pendingDocuments = documents?.filter(
    (document) => document.state === "pending"
  );

  const dataSource = pendingDocuments?.map((document) => {
    return {
      state: document.state,
      documentTitle: document.title,
      author: getEmailById(document.userId),
      topic: getTopicNameById(document.topicId),
      descriptions: document.description,
      action: (
        <>
          <Button
            className="mr-2"
            style={{ color: "blue" }}
            onClick={() => handleActive(document.id)}
          >
            Active
          </Button>
          <Button onClick={() => navigate(`/document/detail/${document.id}`)}>
            Detail
          </Button>
        </>
      ),
    };
  });

  const columns = [
    {
      title: "DocumentTitle",
      dataIndex: "documentTitle",
      key: "documentTitle",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Topic",
      dataIndex: "topic",
      key: "topic",
    },
    {
      title: "Descriptions",
      dataIndex: "descriptions",
      key: "descriptions",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];
  return (
    <div className=" h-full w-full text-center px-5">
      <h1 className="mt-12 mb-16 text-5xl font-bold">List Documents</h1>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};
export default ListPendingDocument;
