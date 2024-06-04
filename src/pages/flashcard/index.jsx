import { useEffect, useState } from "react";
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
  Space,
  notification,
} from "antd";
import Search from "../../components/search";
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/http";
import useAllFlashCard from "../../hook/flashcard/useAllFlashCard";
import FlashCard from "./components/FlashCard";
const ITEM_DISPLAY = 9;
const FlashcardScreen = () => {
  const queryClient = useQueryClient();
  const [isViewModal, setIsViewModal] = useState(false);
  const [page, setPage] = useState(1);
  const onChangePage = (page) => {
    setPage(page);
  };
  const flashcards = useAllFlashCard();
  const topics = useAllTopic();
  const [topicFilter, setTopicFilter] = useState();
  const [search, setSearch] = useState("");
  const [displayFlashcards, setDisplayFlashcards] = useState([]);
  const topicOptions = () => {
    return topics?.map((topic) => ({
      value: topic.id,
      label: <span>{topic.name}</span>,
    }));
  };
  useEffect(() => {
    let filteredFlashcards = flashcards;
    if (topicFilter) {
      filteredFlashcards = flashcards.filter(
        (document) => document.topic_id == topicFilter
      );
    }
    if (search) {
      filteredFlashcards = flashcards.filter((flashcard) =>
        flashcard.name
          .toLowerCase()
          .trim()
          .includes(search.toLowerCase().trim())
      );
    }
    const startIndex = (page - 1) * ITEM_DISPLAY;
    const endIndex = startIndex + ITEM_DISPLAY;
    setDisplayFlashcards(filteredFlashcards?.slice(startIndex, endIndex));
  }, [flashcards, page, topicFilter, search]);

  const token = localStorage.getItem("token");
  const createFlashCard = useMutation({
    mutationFn: (formData) => {
      return api.post("/flashcard/create", formData, {
        headers: {
          Authorization: token,
        },
      });
    },
  });
  const onSubmitForm = (body) => {
    createFlashCard.mutate(body, {
      onSuccess() {
        queryClient.invalidateQueries("flashcards");
        notification.success({ message: "Create successfully" });
        setIsViewModal(false);
      },
    });
  };

  return (
    <>
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
              <span className="mr-[3px]">Create</span> <PlusCircleOutlined />
            </div>
          </div>
        </div>
        <Row gutter={[16, 40]} className="pt-[100px]">
          {displayFlashcards?.map((flashcard) => {
            return (
              <Col
                key={document.id}
                className="gutter-row"
                xs={24}
                sm={12}
                md={6}
              >
                <FlashCard flashcard={flashcard} />
              </Col>
            );
          })}
        </Row>
        <Pagination
          style={{ textAlign: "center", marginTop: "1rem" }}
          defaultCurrent={1}
          total={flashcards?.length}
          onChange={onChangePage}
        />
      </div>
      <Modal
        footer=""
        title={`Create flashcards`}
        open={isViewModal}
        onCancel={() => setIsViewModal(false)}
      >
        <Form onFinish={onSubmitForm} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="topicId" label="Topic" rules={[{ required: true }]}>
            <Select placeholder="Select topic" options={topicOptions()} />
          </Form.Item>
          <>
            <Form.List name="questions">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{
                        display: "flex",
                        marginBottom: 8,
                        justifyContent: "space-around",
                      }}
                      align="baseline"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, "question"]}
                        rules={[
                          { required: true, message: "Missing first question" },
                        ]}
                      >
                        <Input placeholder="question" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "answer"]}
                        rules={[
                          { required: true, message: "Missing last answer" },
                        ]}
                      >
                        <Input placeholder="Answer" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add flashcard
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item style={{ textAlign: "right" }}>
            <Button
              loading={createFlashCard.isPending}
              type="primary"
              htmlType="submit"
            >
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default FlashcardScreen;
