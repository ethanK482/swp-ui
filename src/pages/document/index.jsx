import { PlusCircleOutlined } from '@ant-design/icons';
import { Modal, notification } from 'antd'
import { useMutation, } from "@tanstack/react-query";
import api from "../../api/http";
import { useState } from "react";
import DocumentStyle from './document.style';

const DocumentScreen = () => {
    const uploadAvatar = useMutation({
        mutationFn: (formData) => {
            return api.patch("/document", formData, {
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
        formData.append("file", file)
        uploadAvatar.mutate(formData, {
            onSuccess() {
                queryClient.invalidateQueries("PROFILE");
                notification.success({ message: "Upload file successfully" })

            }, onError() {
                notification.error({ message: "Upload file failed" });
            }
        })

        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return <DocumentStyle>
        <div className='min-h-screen  '>
            <button onClick={showModal} className='Upload-button bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center    '  >
                Upload Document
                <PlusCircleOutlined />
            </button>
            <Modal title="Upload Document ?" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <input onChange={(e) => {
                    setFile(e.target.files[0])

                }} type="file" placeholder="Choose File" />
            </Modal>
        </div>
    </DocumentStyle>

};
export default DocumentScreen;