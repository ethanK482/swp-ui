/* eslint-disable react/prop-types */
import { Card, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import getReviewStatus from "../../../helpers/getReviewStatus";
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";
import useAllUser from "../../../hook/user/useAllUser";
import Meta from "antd/es/card/Meta";
import DocumentCardStyle from "../../documents/DocumentCard.style";
const FlashCard = ({ flashcard }) => {
  console.log(flashcard);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleViewDocument = () => {
    if (token == null) {
      navigate("/login");
    }
    navigate(`/flashCard/detail/${flashcard.id}`);
  };
  const { totalHelpful, totalUnhelpful } = getReviewStatus(flashcard.reviews);
  const experts = useAllUser();
  const findUserById = (id) => {
    return experts?.find((user) => user.id == id);
  };
  return (
    <DocumentCardStyle>
      <Card onClick={handleViewDocument} hoverable title={flashcard?.name}>
        <Meta
          className="mb-3"
          title={
            <>
              <Tag icon={<LikeOutlined />} color="green">
                {totalHelpful}
              </Tag>{" "}
              <Tag icon={<DislikeOutlined />} color="warning">
                {totalUnhelpful}
              </Tag>
            </>
          }
          description={
            <>
             <p className="font-bold text-black">
              {findUserById(flashcard.user_id)?.fullName}
            </p>
            <Tag>{flashcard.questions.length} cards</Tag>
            </>
           
          }
        />
      </Card>
    </DocumentCardStyle>
  );
};
export default FlashCard;
