import { Card, Modal, Radio } from "antd";
import CourseDetailStyle from "./CourseDetailStyle";
import { useParams } from "react-router-dom";
import { useState } from "react";
import useAllBoughtCourse from "../../../../hook/course/useAllBoughtCourse";
import useAllExpert from "../../../../hook/user/useAllUser";
import VideoPlayer from "../../../expert/conponents/Video";
import CreateReview from "./CreateReview";
import calculateRating from "../../../../helpers/CalculateRating";
import { FaStar } from "react-icons/fa";
const CourseBought = () => {
  const { id } = useParams();

  const courses = useAllBoughtCourse();
  const experts = useAllExpert();
  const course = courses?.find((course) => course.id == id);
  const expert = experts?.find((expert) => expert.id == course?.expertId);
  const [isView, setIsView] = useState(false);
  const [activeLesson, setActiveLesson] = useState(null);
  const { total, rate } = calculateRating(course?.reviews);
  const lessonItem = (lesson, i) => {
    return (
      <div
        key={i}
        onClick={() => {
          setActiveLesson(lesson), setIsView(true);
        }}
        className="course-detail_content__lessons__item hover:bg-slate-300 font-bold"
      >
        <p className="ml-3">
          {lesson?.lesson_order}. {lesson?.name}{" "}
        </p>
      </div>
    );
  };

  const lessonNav = (lesson, i) => {
    return (
      <div
        key={i}
        className="flex items-center p-2 min-h-[50px] border  font-bold"
      >
        <Radio checked={activeLesson?.id === lesson?.id} />
        <p
          onClick={() => {
            setActiveLesson(lesson), setIsView(true);
          }}
          className="ml-3 hover:text-[#7F00FF] cursor-pointer"
        >
          {lesson?.lesson_order}. {lesson?.name}{" "}
        </p>
      </div>
    );
  };

  return (
    <CourseDetailStyle>
      <div className="course-detail">
        <div className="course-detail_banner">
          <div className="course-detail_banner__info">
            <h1 className="course-detail_banner__info___title mb-3">
              {course?.name}
            </h1>
            <div className="flex items-center mb-2">
              {" "}
              <div className="flex items-center">
                {" "}
                <p className="text-[#FFD700] font-bold mr-1">
                  {rate?.toFixed(1)}
                </p>{" "}
                <FaStar className="text-[#FFD700] " />
              </div>
              <span className="underline text-white cursor-pointer">
                ({total} ratings)
              </span>
            </div>
            <span className="text-white">Created by {expert?.fullName}</span>

            <p className="text-white text-sm ">
              Last updated{" "}
              <span className="text-sky-400">
                {new Date(course?.updated_at)?.getMonth() +
                  1 +
                  "/" +
                  new Date(course?.updated_at)?.getFullYear()}
              </span>
            </p>
          </div>
          <div>
            <Card
              style={{ width: "300px", minHeight: "150px", margin: "auto" }}
              cover={
                <img
                  alt={course?.name}
                  src={course?.banner_url}
                  style={{
                    width: "100%",
                    height: "152px",
                    objectFit: "cover",
                  }}
                />
              }
            ></Card>
          </div>
        </div>

        <div className="course-detail_content">
          <div className="course-detail_content__lessons">
            {course?.lessons.map((lesson, i) => lessonItem(lesson, i))}
          </div>

          <div className="course-detail_content_description">
            <h1>Description</h1>
            <p>{course?.description}</p>
          </div>
          <div className="course-detail_content_review">
            <CreateReview course={course} />
          </div>
        </div>
        <Modal
          width={"80%"}
          title={`${activeLesson?.lesson_order}.${activeLesson?.name}`}
          open={isView}
          onCancel={() => setIsView(false)}
          footer=""
        >
          <div className="flex">
            <VideoPlayer
              isNav={true}
              isShowTitle={false}
              lesson={activeLesson}
            />{" "}
            <div className="flex gap-3 ml-3 ">
              <p>{course?.lessons.map((lesson, i) => lessonNav(lesson, i))}</p>
            </div>
          </div>
        </Modal>
      </div>
    </CourseDetailStyle>
  );
};
export default CourseBought;
