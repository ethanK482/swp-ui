/* eslint-disable react/prop-types */
import { Card } from "antd";
import CourseCardStyle from "./CourseCardStyle";
import { useNavigate } from "react-router-dom";
import calculateRating from "../../../../helpers/CalculateRating";
import { FaStar } from "react-icons/fa";
const CourseCard = ({ course, expert }) => {
  const token = localStorage.getItem("token");
  const { total, rate } = calculateRating(course?.reviews);
  const navigate = useNavigate();
  const handleClick = () => {
    if (!token) navigate("/login");
    navigate(`/course/${course.id}` )
  };
  return (
    <CourseCardStyle>
      <Card
        style={{ minHeight: "292px" }}
        onClick={handleClick}
        className="no-radius-card"
        hoverable
        cover={
          <img
            alt={course.name}
            src={course.banner_url}
            style={{
              width: "100%",
              height: "151px",
              objectFit: "cover",
            }}
          />
        }
      >
        <p className="course_name">{course.name} </p>
        <p className="">{expert.fullName}</p>
        <div className="flex items-center mb-2">
              <div className="flex items-center">
                <p className="text-[#FFD700] font-bold mr-1">
                  {rate?.toFixed(1)}
                </p>{" "}
                <FaStar className="text-[#FFD700] " />
              </div>
              <span className="underline text-black cursor-pointer">
                ({total} ratings)
              </span>
            </div>
        <div className="flex items-center text-black ">
          <span className="mb-[4px]">đ</span>{" "}
          <p className="  text-xl ">{course.price.toLocaleString("vi-VN")}</p>
        </div>
      </Card>
    </CourseCardStyle>
  );
};
export default CourseCard;
