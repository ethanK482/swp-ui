
import useAllDocuments from "../../../hook/documents/useAllDocument";
import {
    Button,
    Table,
} from "antd";
import api from "../../../api/http";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
const ListPendingDocument = () => {
    const documents = useAllDocuments();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const activeMutation = useMutation({
        mutationFn: ({ formData}) => {
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
        activeMutation.mutate({formData });
    };
    const pendingDocuments = documents?.filter(document => document.state === "pending");

    const dataSource = pendingDocuments?.map((document) => {
        return {
            state: document.state,
            documentTitle: document.title,
            documentId: document.id,
            topic:document.topicId,
            descriptions: document.description ,
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
            title: 'DocumentTitle',
            dataIndex: 'documentTitle',
            key: 'documentTitle',
        },
        {
            title: 'DocumentId',
            dataIndex: 'documentId',
            key: 'documentId',
        },
        {
            title: 'Topic',
            dataIndex: 'topic',
            key: 'topic',
        },
        {
            title: 'Descriptions',
            dataIndex: 'descriptions',
            key: 'descriptions',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
        },
    ];
    return (
        <div className=" h-full w-full text-center px-5">

            <h1 className="mt-12 mb-16 text-5xl font-bold">List Documents</h1>
            <Table dataSource={dataSource} columns={columns} />




        </div>
    );
}
export default ListPendingDocument;
