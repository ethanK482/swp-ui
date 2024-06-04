/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import PDFViewer from "../../components/PdfViewer";
import useAllDocuments from "../../../../hook/documents/useAllDocument";
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";
import getReviewStatus from "../../../../helpers/getReviewStatus";
import useAllTopic from "../../../../hook/topic/useAllTopic";
import { Tag } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../../api/http";
import useAuthorRoute from "../../../../hook/user/useAuthorRoute";

const DocumentDetail = () => {
  useAuthorRoute();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const documents = useAllDocuments();
  const topics = useAllTopic();
  const documentActive = documents?.find((document) => document.id == id);
  const { totalHelpful, totalUnhelpful } = getReviewStatus(
    documentActive?.reviews
  );
  const topicName = topics?.find((i) => i.id == documentActive?.topicId)?.name;
  const token = localStorage.getItem("token");
  const reviewMutation = useMutation({
    mutationFn: (body) => {
      return api.post("/upload-review", body, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
    },
  });
  const handleReview = (state) => {
    const formData = new FormData();
    formData.append('review', state)
    formData.append('documentId', documentActive?.id)
    reviewMutation.mutate(formData, {
      onSuccess(){
        queryClient.invalidateQueries("documents");
      }
    })
  }
  return (
    <div className="flex flex-col">
      <div className="justify-start gap-10 py-5 pl-5 bg-[#323639] text-[#fff] fixed left-0 right-0 ">
        <p className="font-bold text-sm">{topicName}</p>
        <p className="font-bold text-xl">{documentActive?.title}</p>
        <Tag onClick={ () => handleReview('helpful')} className="hover:opacity-[0.4]" style={{cursor:"pointer"}} icon={<LikeOutlined   />} color="green">
          {totalHelpful}
        </Tag>
        <Tag onClick={ () => handleReview('unhelpful')} className="hover:opacity-[0.4]"  style={{cursor:"pointer"}} icon={<DislikeOutlined />} color="warning">
          {totalUnhelpful}{" "}
        </Tag>
      </div>

      <PDFViewer   file={documentActive?.fileUrl} />
    </div>
  );
};
export default DocumentDetail;
