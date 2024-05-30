import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/http";
import {  Input, Modal, notification } from 'antd';
import { useEffect, useState } from "react";
import { Image } from 'antd';
import { VerticalAlignTopOutlined, EditOutlined } from '@ant-design/icons';
import Loading from "../../components/loading";
import useUserInfo from "../../hook/user/useUserInfo";
import TextArea from "antd/es/input/TextArea";
import useAuthorRoute from "../../hook/user/useAuthorRoute";
const ProfileScreen = () => {
  useAuthorRoute()
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");
  const user = useUserInfo();
  //update About
  const changeAboutMutation = useMutation({
    mutationFn: (body) => {
      return api.patch("/update-about", body, {
        headers: {
          Authorization: token,
        },
      });
    },

  });

  const showModalAbout = () => {
    setIsModalAboutOpen(true);
  };
  const [isModalAboutOpen, setIsModalAboutOpen] = useState(false);
  const [about, setAbout] = useState(user?.about);
  const handleAboutOk = () => {
    const body = { nabout: about };
    changeAboutMutation.mutate(body, {
      onSuccess() {
        queryClient.invalidateQueries("PROFILE");
        notification.success({ message: "Edit about successfully" })

      }, onError() {
        notification.success({ message: "Edit about failed, Try again later" })
      }
    })
    setIsModalAboutOpen(false);
  };

  const handleAboutCancel = () => {
    setIsModalAboutOpen(false);
  };

  //update Name
  const changeNameMutation = useMutation({
    mutationFn: (body) => {
      return api.patch("/update-profile", body, {
        headers: {
          Authorization: token,
        },
      });
    },

  });

  const showModalName = () => {
    setIsModalNameOpen(true);
  };
  const [isModalNameOpen, setIsModalNameOpen] = useState(false);
  const [name, setName] = useState(user?.fullName);
  useEffect(() => {
    setName(user?.fullName)
    setAbout(user?.about)
  }, [user])
  const handleNameOk = () => {
    const body = { nfullName: name };
    changeNameMutation.mutate(body, {
      onSuccess() {
        queryClient.invalidateQueries("PROFILE");
        notification.success({ message: "Edit name successfully" })

      }, onError() {
        notification.success({ message: "Edit name failed, Try again later" })
      }
    })
    setIsModalNameOpen(false);
  };

  const handleNameCancel = () => {
    setIsModalNameOpen(false);
  };

  //show modal upload avatar
  const uploadAvatar = useMutation({
    mutationFn: (formData) => {
      return api.patch("/update-avatar", formData, {
        headers: { 'content-type': 'multipart/form-data', Authorization: token }
      });
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState();
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
    <div>
      <>
        <link
          rel="stylesheet"
          href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"
        />
        <link
          rel="stylesheet"
          href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
        />
        <main className="profile-page">
          <section className="relative block h-500-px">
            <div
              className="absolute top-0 w-full h-full bg-center bg-cover"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80")',
              }}
            >
              <span
                id="blackOverlay"
                className="w-full h-full absolute opacity-50 bg-black"
              />
            </div>
            <div
              className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
              style={{ transform: "translateZ(0px)" }}
            >
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x={0}
                y={0}
              >
                <polygon
                  className="text-blueGray-200 fill-current"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </section>
          <section className="relative py-16 bg-blueGray-200">
            <div className="container mx-auto px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-xl rounded-lg -mt-64">
                <div className="px-6">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                      <div className="relative text-center ">
                        {uploadAvatar.isPending ? <Loading /> : <>
                          <Image className="w-30 h-30 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 "
                            width={200}
                            src={user?.avatarUrl}
                            alt="Avatar" />


                          <button onClick={showModal} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                            <VerticalAlignTopOutlined />
                            <span>Update avatar</span>
                          </button>
                        </>
                        }


                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                      {/* <div className="py-6 px-3 mt-32 sm:mt-0">
                        <button
                          className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                          type="button"
                        >
                          Connect
                        </button>
                      </div> */}
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                      {/* <div className="flex justify-center py-4 lg:pt-4 pt-8">
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                            22
                          </span>
                          <span className="text-sm text-blueGray-400">
                            Friends
                          </span>
                        </div>
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                            10
                          </span>
                          <span className="text-sm text-blueGray-400">
                            Photos
                          </span>
                        </div>
                        <div className="lg:mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                            89
                          </span>
                          <span className="text-sm text-blueGray-400">
                            Comments
                          </span>
                        </div>
                      </div> */}
                    </div>
                  </div>
                  <div className="text-center mt-12">
                    {changeNameMutation.isPending ? <Loading /> : <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2">
                      {user?.fullName}
                      <button onClick={showModalName}>

                        <EditOutlined />

                      </button>
                    </h3>}




                    <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold">
                      <i className="fas fa-envelope  mr-2 text-lg text-blueGray-400"></i>

                      {user?.email}
                    </div>
                    <div className="text-blueGray-600">
                      <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400" />
                      {user?.role?.toUpperCase()}
                    </div>
                  </div>
                  <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-9/12 px-4 flex-col">
                        <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                          {user?.about}
                        
                        </p>
                        <button className="ml-2 text-pink-500" onClick={showModalAbout}>
                            Update about
                            <EditOutlined />

                          </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <footer className="relative bg-blueGray-200 pt-8 pb-6 mt-8">
              <div className="container mx-auto px-4">
                <div className="flex flex-wrap items-center md:justify-between justify-center">
                  <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                    <div className="text-sm text-blueGray-500 font-semibold py-1">
                      SWP391 Project
                   
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </section>
        </main>
      </>
      <Modal title="Update avatar ?" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <input onChange={(e) => {
          setFile(e.target.files[0])

        }} type="file" placeholder="Choose avatar" />
      </Modal>

      <Modal title="Edit name" open={isModalNameOpen} onOk={handleNameOk} onCancel={handleNameCancel}>
        <Input onChange={(e) => setName(e.target.value)} value={name}  placeholder="New name"/>
      </Modal>

      <Modal title="Edit About" open={isModalAboutOpen} onOk={handleAboutOk} onCancel={handleAboutCancel}>
        <TextArea  onChange={(e) => setAbout(e.target.value)} value={about} placeholder="Enter something about you" autoSize />
      </Modal>
    </div>
  );
};
export default ProfileScreen;
