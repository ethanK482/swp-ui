import { FlashcardArray } from "react-quizlet-flashcard";
import { useParams } from "react-router-dom";
import useAllFlashCard from "../../../../hook/flashcard/useAllFlashCard";
import FlashcardDetailStyle from "./FlashcardDetailStyle";
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../../api/http";
import { Tag } from "antd";
import useAllTopic from "../../../../hook/topic/useAllTopic";
import getReviewStatus from "../../../../helpers/getReviewStatus";
import useAuthorRoute from "../../../../hook/user/useAuthorRoute";
/* eslint-disable react/prop-types */
const FlashCardDetailScreen = () => {
  useAuthorRoute();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const flashcards = useAllFlashCard();
  const activeFlashcard = flashcards?.find((flashcard) => flashcard.id == id);
  const token = localStorage.getItem("token");
  const reviewMutation = useMutation({
    mutationFn: (body) => {
      return api.post("/flashcard/upload-review", body, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
    },
  });
  const { totalHelpful, totalUnhelpful } = getReviewStatus(
    activeFlashcard?.reviews
  );
  const renderCard = () => {
    const questions = activeFlashcard?.questions;

    return questions?.map((question) => {
      return {
        id: 1,
        frontHTML: (
          <div className="h-[100%]  flex items-center justify-center bg-[#323639]   text-white rounded">
            {" "}
            <span className="text-xl font-bold">{question.question}</span>
          </div>
        ),
        backHTML: (
          <div className="h-[100%] flex items-center justify-center  bg-[#323639]   text-white  rounded">
            {" "}
            <span className="text-xl font-bold">{question.answer}</span>
          </div>
        ),
      };
    });
  };
  const handleReview = (state) => {
    const formData = new FormData();
    formData.append("review", state);
    formData.append("flashcardId", activeFlashcard?.id);
    reviewMutation.mutate(formData, {
      onSuccess() {
        queryClient.invalidateQueries("flashcards");
      },
    });
  };
  const topics = useAllTopic();
  const topicName = topics?.find(
    (i) => i.id == activeFlashcard?.topic_id
  )?.name;
  return (
    <FlashcardDetailStyle>
      <div className="flashcard-detail  flex items-start justify-center mt-[100px] flashcard-detail">
        <div className="justify-start gap-10 py-5 pl-5 bg-[#323639] text-[#fff] fixed top-[63px] left-0 right-0  z-10 ">
          <p className="font-bold text-sm">{topicName}</p>
          <p className="font-bold text-xl">{activeFlashcard?.name}</p>
          <Tag
            onClick={() => handleReview("helpful")}
            className="hover:opacity-[0.4]"
            style={{ cursor: "pointer" }}
            icon={<LikeOutlined />}
            color="green"
          >
            {totalHelpful}
          </Tag>
          <Tag
            onClick={() => handleReview("unhelpful")}
            className="hover:opacity-[0.4]"
            style={{ cursor: "pointer" }}
            icon={<DislikeOutlined />}
            color="warning"
          >
            {totalUnhelpful}{" "}
          </Tag>
        </div>
        {activeFlashcard && <FlashcardArray cards={renderCard()} />}
      </div>

      {activeFlashcard?.questions.length > 0 && (
        <div className="mt-3 m-3">
          <div className="mt-2 p-3">
            {activeFlashcard?.questions?.map((question) => {
              return (
                <div key={question?.id} className="flex">
                  <div className="border mb-2 p-3 bg-[#323639]   w-[50%]  text-white ">
                    <span>{question.question}</span>{" "}
                  </div>
                  <div className="border mb-2 p-3 bg-[#323639] w-[50%]   text-white ">
                    <span>{question.answer}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </FlashcardDetailStyle>
  );
};
export default FlashCardDetailScreen;
