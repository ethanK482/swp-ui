import {
  Avatar,
  Button,
  DatePicker,
  Form,
  Input,
  Menu,
  Modal,
  Select,
  Tag,
  notification,
} from "antd";
import useUserInfo from "../../hook/user/useUserInfo";
import ProfileStyle from "./profileStyle";
import { useEffect, useState } from "react";
import moment from "moment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/http";
import { AppstoreOutlined, SettingOutlined } from "@ant-design/icons";
import MyLearning from "./components/myLearning";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const role = localStorage.getItem("role");
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");
  const [isShowSave, setIsShowSave] = useState(false);
  const updateProfile = useMutation({
    mutationFn: (body) => {
      return api.put("/user/profile", body, {
        headers: {
          Authorization: token,
        },
      });
    },
  });
  const user = useUserInfo();
  const [form] = Form.useForm();
  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];
  const [_dob, setDob] = useState(null);
  const [file, setFile] = useState();
  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        fullName: user.fullName,
        email: user.email,
        gender: user.gender,
        price: user.price,
        about: user.about,
        dob: user.dob ? moment(user.dob) : null,
      });
    }
  }, [user, form]);
  const onFinish = (values) => {
    const body = { ...values, dob: new Date(_dob) };
    updateProfile.mutate(body, {
      onSuccess() {
        queryClient.invalidateQueries("PROFILE");
        setIsShowSave(false);
        notification.success({ message: "Update successfully" });
      },
      onError() {
        notification.error({ message: "Update failed, try again" });
      },
    });
  };
  const uploadAvatar = useMutation({
    mutationFn: (formData) => {
      return api.patch("/update-avatar", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (!file) {
      return;
    }
    let formData = new FormData();
    formData.append("image", file);
    uploadAvatar.mutate(formData, {
      onSuccess() {
        queryClient.invalidateQueries("PROFILE");
        notification.success({ message: "Update avatar successfully" });
      },
      onError() {
        notification.error({ message: "Update avatar failed" });
      },
    });

    setIsModalOpen(false);
  };
  const navigate = useNavigate();
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const menuOnclick = (e) => {
    switch (e.key) {
      case "logout": {
        localStorage.clear();
        window.location.replace("/login");
        break;
      }
      case "changePassword": {
        navigate("/update-password");
        break;
      }
      case "dashboard": {
        navigate("/dashboard");
        break;
      }
      case "courseManagement": {
        navigate("/expert");
        break;
      }
    }
  };
  const getManagement = () => {
    switch (role) {
      case "admin": {
        return {
          key: "sub1",
          icon: <AppstoreOutlined />,
          label: "Management",
          children: [{ key: "dashboard", label: "Admin Dashboard" }],
        };
      }
      case "expert": {
        return {
          key: "sub1",
          icon: <AppstoreOutlined />,
          label: "Management",
          children: [{ key: "courseManagement", label: "Course management" }],
        };
      }
    }
  };
  const getLegitMarkTag = (mark) => {
    if (mark < 0) return <Tag color="black">Legit {mark}</Tag>;
    if (mark == 0) return <Tag color="green">Legit {mark}</Tag>;
    if (mark >= 0 && mark < 200) return <Tag color="purple">Legit {mark}</Tag>;
    return <Tag color="gold">Legit {mark}</Tag>;
  };
  const getRoleTag = () => {
    switch (role) {
      case "admin": {
        return <Tag color="gold">ADMIN</Tag>;
      }
      case "expert": {
        return <Tag color="purple">EXPERT</Tag>;
      }
      case "user": {
        return <Tag color="green">USER</Tag>;
      }
    }
  };

  const menuItems = [
    getManagement(),
    {
      key: "sub2",
      label: "Security",
      icon: <SettingOutlined />,
      children: [
        { key: "changePassword", label: "Change password" },
        { key: "logout", label: "Logout" },
      ],
    },
  ];
  return (
    <ProfileStyle>
      <div className="profile">
        <div className="profile_avatar">
          <div className="profile_avatar_top">
            {uploadAvatar.isPending ? (
              "Uploading..."
            ) : (
              <Avatar
                className="profile_avatar_top_image"
                size={120}
                src={user?.avatarUrl}
              />
            )}
            <span
              onClick={showModal}
              className="profile_avatar_top_update p-10 bg-slate-100"
            >
              Update
            </span>
            <p>{user?.fullName}</p>
          </div>
            <div> {getRoleTag() } {getLegitMarkTag(user?.legitMark)}</div>
          <div>
            <Menu
              onClick={menuOnclick}
              style={{ width: 256 }}
              mode="vertical"
              items={menuItems}
            />
          </div>
        </div>
        <div className="profile_information">
          <div className="profile_information_header">
            <p className="profile_information_header_title">Public profile</p>
            <p className="profile_information_header_des text-white">
              Add information about yourself
            </p>
          </div>
          <div className="profile_information_content">
            <Form
              onChange={() => setIsShowSave(true)}
              onFinish={onFinish}
              form={form}
              layout="vertical"
            >
              <Form.Item name="fullName" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="email">
                <Input readOnly placeholder="Email" />
              </Form.Item>
              <Form.Item name="gender">
                <Select
                  options={genderOptions}
                  onChange={() => setIsShowSave(true)}
                  placeholder="Gender"
                />
              </Form.Item>

              <Form.Item name="dob">
                <DatePicker
                  onChange={(_, dateString) => {
                    setDob(dateString), setIsShowSave(true);
                  }}
                  placeholder="Birthday"
                />
              </Form.Item>
              <Form.Item name="about">
                <Input.TextArea placeholder="About your self..." />
              </Form.Item>
              <Form.Item style={{ textAlign: "right" }}>
                {isShowSave &&
                  (updateProfile.isPending ? (
                    <Button loading>Loading...</Button>
                  ) : (
                    <Button type="primary" htmlType="submit">
                      Save
                    </Button>
                  ))}
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      <MyLearning />
      <Modal
        title="Update avatar ?"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <input
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
          type="file"
          placeholder="Choose avatar"
        />
      </Modal>
    </ProfileStyle>
  );
};
export default Profile;