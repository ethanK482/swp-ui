import { useState } from "react";
import { Button, Table, Modal, notification, Input } from "antd";
import useAllTopic from "../../../hook/topic/useAllTopic";
import api from "../../../api/http";
import { useQueryClient } from "@tanstack/react-query";

const { confirm } = Modal;

const Topic = () => {
  const topics = useAllTopic();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentTopic, setCurrentTopic] = useState(null);
  const [newTopicName, setNewTopicName] = useState("");
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");

  const showDeleteConfirm = (id) => {
    confirm({
      title: "Are you sure you want to delete this topic?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDelete(id);
      },
    });
  };

  const showUpdateModal = (topic) => {
    setCurrentTopic(topic);
    setNewTopicName(topic.name);
    setIsModalVisible(true);
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/topic/${currentTopic.id}`,newTopicName, {
        headers: {
          Authorization: token,
        },
      });
      notification.success({
        message: "Topic Updated",
        description: `Topic has been successfully updated.`,
      });
      setIsModalVisible(false);
      queryClient.invalidateQueries("topics");
    } catch (error) {
      notification.error({
        message: "Update Failed",
        description: `Failed to update the topic.`,
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/topic/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      notification.success({
        message: "Topic Deleted",
        description: `Topic has been successfully deleted.`,
      });
      queryClient.invalidateQueries("topics");
    } catch (error) {
      notification.error({
        message: "Deletion Failed",
        description: `Failed to delete the topic.`,
      });
    }
  };

  const handleCreate = async () => {
    try {
      await api.post(`/topic?name=${newTopicName}`,{}, {
        headers: {
          Authorization: token,
        },
      });
      notification.success({
        message: "Topic Created",
        description: `Topic has been successfully created.`,
      });
      setIsModalVisible(false);
      queryClient.invalidateQueries("topics");
    } catch (error) {
      notification.error({
        message: "Create Failed",
        description: `Failed to create topic.`,
      });
    }
  };

  const dataSource = topics?.map((topic) => ({
    id: topic.id,
    topicName: topic.name,
    action: (
      <>
        <Button className="mr-2" style={{ color: "blue" }} onClick={() => showUpdateModal(topic)}>
          Update
        </Button>
        <Button className="mr-2" style={{ color: "red" }} onClick={() => showDeleteConfirm(topic.id)}>
          Delete
        </Button>
      </>
    ),
  }));

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Topic Name",
      dataIndex: "topicName",
      key: "topicName",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  return (
    <div className="h-full w-full text-center px-5">
      <h1 className="mt-12 mb-16 text-5xl font-bold">List Topic</h1>
      <Button
        type="primary"
        className="float-right"
        onClick={() => setIsModalVisible(true)}
      >
        Create New Topic
      </Button>
      <Table dataSource={dataSource} columns={columns} />
      <Modal
        title={currentTopic ? "Update Topic" : "Create New Topic"}
        visible={isModalVisible}
        onOk={currentTopic ? handleUpdate : handleCreate}
        onCancel={() => setIsModalVisible(false)}
      >
        <Input
          value={newTopicName}
          onChange={(e) => setNewTopicName(e.target.value)}
          placeholder="Enter topic name"
        />
      </Modal>
    </div>
  );
};

export default Topic;
