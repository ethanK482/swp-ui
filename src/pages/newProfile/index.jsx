import {
  Avatar,
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  notification,
} from "antd";
import useUserInfo from "../../hook/user/useUserInfo";
import ProfileStyle from "./profileStyle";
import { useEffect, useState } from "react";
import moment from "moment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/http";
import { Link } from "react-router-dom";
import MyLearning from "./components/myLearning";
const Profile = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");
  const [isShowSave, setIsShowSave] = useState(false)
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
        setIsShowSave(false)
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
        headers: { 'content-type': 'multipart/form-data', Authorization: token }
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
    formData.append("image", file)
    uploadAvatar.mutate(formData, {
      onSuccess() {
     
        queryClient.invalidateQueries("PROFILE");
        notification.success({ message: "Update avatar successfully" })

      }, onError() {
        notification.error({ message: "Update avatar failed" });
      }
    })

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <ProfileStyle>
      <div className="profile">
        <div className="profile_avatar">
          <div className="profile_avatar_top">
          {uploadAvatar.isPending ? "Uploading..." :  <Avatar  className="profile_avatar_top_image" size={120} src={user?.avatarUrl} />}
            <span onClick={showModal} className="profile_avatar_top_update p-10 bg-slate-100">Update</span>
            <p>{user?.fullName}</p>
          </div>

          <div>
            <Link to={"/update-password"}>Change password</Link>
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
      <Modal title="Update avatar ?" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <input onChange={(e) => {
          setFile(e.target.files[0])

        }} type="file" placeholder="Choose avatar" />
      </Modal>
    </ProfileStyle>
  );
};
export default Profile;
