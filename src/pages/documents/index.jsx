import { useEffect, useState } from "react";
import DocumentStyle from "./DocumentStyle.style";
import useAllTopic from "../../hook/topic/useAllTopic";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Pagination,
  Row,
  Select,
  notification,
} from "antd";
import Search from "../../components/search";
import useAllDocuments from "../../hook/documents/useAllDocument";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/http";
import DocumentCard from "./components/DocumentCard";
const ITEM_DISPLAY = 12;
const Document = () => {
  const queryClient = useQueryClient();
  const [isViewModal, setIsViewModal] = useState(false);
  const [page, setPage] = useState(1);
  const onChangePage = (page) => {
    setPage(page);
  };
  const documents = useAllDocuments();
  const topics = useAllTopic();
  const [topicFilter, setTopicFilter] = useState();
  const [search, setSearch] = useState("");
  const [displayDocuments, setDisplayDocuments] = useState([]);
  const topicOptions = () => {
    return topics?.map((topic) => ({
      value: topic.id,
      label: <span>{topic.name}</span>,
    }));
  };
  useEffect(() => {
    let filteredDocuments = documents;
    if (topicFilter) {
      filteredDocuments = documents.filter(
        (document) => document.topicId == topicFilter
      );
    }
    if (search) {
      filteredDocuments = documents.filter((document) =>
        document.title
          .toLowerCase()
          .trim()
          .includes(search.toLowerCase().trim())
      );
    }
    const startIndex = (page - 1) * ITEM_DISPLAY;
    const endIndex = startIndex + ITEM_DISPLAY;
    setDisplayDocuments(filteredDocuments?.slice(startIndex, endIndex));
  }, [documents, page, topicFilter, search]);
  const [files, setFiles] = useState(null);
  const handleChangeBanner = (info) => {
    const file = info.files[0];
    if (!file.name.includes("pdf")) {
      notification.error({ message: "Document must be pdf file" });
      setFiles(null);
    } else {
      setFiles(info.files);
    }
  };
  const isDisableButton = files == null;

  const token = localStorage.getItem("token");
  const uploadDocument = useMutation({
    mutationFn: (formData) => {
      return api.post("/upload-document", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
    },
  });
  const onSubmitForm = (body) => {
    const formData = new FormData();
    formData.append("title", body.title);
    formData.append("topicId", body.topic);
    formData.append("description", body.description);
    formData.append("file", files[0]);
    uploadDocument.mutate(formData, {
      onSuccess() {
        queryClient.invalidateQueries("documents");
        notification.success({ message: "Upload successfully" });
        setIsViewModal(false);
      },
    });
  };

  return (
    <DocumentStyle>
      <div className="min-h-[100vh] px-[50px]  ">
        <div className="fixed z-20 border-1  inset-x-0 top-[59px] border-2">
          <div className="flex justify-between bg-white items-center border-b">
            <div className="flex overflow-x-auto">
              <span
                onClick={() => setTopicFilter("")}
                key="all"
                className="p-[16px] hover:bg-slate-200 whitespace-nowrap"
              >
                All
              </span>
              {topics?.map((topic) => (
                <span
                  onClick={() => setTopicFilter(topic.id)}
                  key={topic.id}
                  className="p-[16px] hover:bg-slate-200 whitespace-nowrap"
                >
                  {topic.name}
                </span>
              ))}
            </div>
            <Search setSearch={setSearch} />
            <div
              onClick={() => setIsViewModal(true)}
              className="mr-5 p-2 rounded hover:bg-[#7F00FF] hover:text-[white]"
            >
              {" "}
              <span className="mr-[3px]">Upload</span> <PlusCircleOutlined />
            </div>
          </div>
        </div>
        <Row gutter={[16, 40]} className="pt-[100px]">
          {displayDocuments?.map((document) => {
            return (
              <Col
                key={document.id}
                className="gutter-row"
                xs={24}
                sm={12}
                md={6}
              >
                <DocumentCard document={document} />
              </Col>
            );
          })}
        </Row>
        <Pagination
          style={{ textAlign: "center", marginTop: "1rem" }}
          defaultCurrent={1}
          total={documents?.length}
          onChange={onChangePage}
        />
      </div>
      <Modal
        footer=""
        title={`Upload a document`}
        open={isViewModal}
        onCancel={() => setIsViewModal(false)}
      >
        <Form onFinish={onSubmitForm} layout="vertical">
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Document file" rules={[{ required: true }]}>
            <input type="file" onChange={(e) => handleChangeBanner(e.target)} />
          </Form.Item>
          <Form.Item name="topic" label="Topic" rules={[{ required: true }]}>
            <Select placeholder="Select topic" options={topicOptions()} />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item style={{ textAlign: "right" }}>
            <Button
              loading={uploadDocument.isPending}
              disabled={isDisableButton}
              type="primary"
              htmlType="submit"
            >
              Upload
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </DocumentStyle>
  );
};
export default Document;
