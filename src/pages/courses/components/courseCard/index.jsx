/* eslint-disable react/prop-types */
import { Card } from "antd";
import CourseCardStyle from "./CourseCardStyle";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
const CourseCard = ({ course, expert }) => {
  const token = localStorage.getItem("token");
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
        <p className="">{expert.full_name}</p>
        <ReactStars value={5} edit={false} count={5} size={24} />
        <div className="flex items-center text-black ">
          <span className="mb-[4px]">đ</span>{" "}
          <p className="  text-xl ">{course.price.toLocaleString("vi-VN")}</p>
        </div>
      </Card>
    </CourseCardStyle>
  );
};
export default CourseCard;
