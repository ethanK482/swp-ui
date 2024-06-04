import { Col, Row } from "antd";
import useUserInfo from "../../hook/user/useUserInfo";
import HomePageStyle from "./HomePageStyle";
import useAllPublicCourse from "../../hook/course/useAllUserCourse";
import useAllUser from "../../hook/user/useAllUser";
import CourseCard from "../courses/components/courseCard";
import useAllDocuments from "../../hook/documents/useAllDocument";
import DocumentCard from "../documents/components/DocumentCard";
import useAllFlashCard from "../../hook/flashcard/useAllFlashCard";
import FlashCard from "../flashcard/components/FlashCard";
import { Link } from "react-router-dom";

const HomePage = () => {
  useUserInfo();
  const courses = useAllPublicCourse();
  const experts = useAllUser();
  const documents = useAllDocuments();
  const flashcards = useAllFlashCard();
  const findExpertById = (id) => {
    return experts?.find((expert) => expert.id == id);
  };
  return (
    <HomePageStyle>
      <div className="home-page">
        <div className="p-5 relative">
          <p className="text-3xl font-bold">Courses</p>
          <Row gutter={[16, 40]} className="pt-[10px]">
            {courses?.slice(0, 4).map((course) => {
              return (
                <Col
                  key={course.id}
                  className="gutter-row"
                  xs={24}
                  sm={12}
                  md={6}
                >
                  <CourseCard
                    expert={findExpertById(course.expertId)}
                    course={course}
                  />
                </Col>
              );
            })}
          </Row>
          <Link
            className="absolute right-0 bottom-[-10px] text-[blue] hover:opacity-[0.4]"
            to={"/courses"}
          >
            View all &rarr;
          </Link>
        </div>
        <div className="p-5  relative">
        <p className="text-3xl font-bold">Documents</p>
          <Row gutter={[16, 40]} className="pt-[10px] ">
            {documents?.slice(0, 4).map((document) => {
              return (
                <Col
                  key={document.id}
                  className="gutter-row"
                  xs={24}
                  sm={12}
                  md={6}
                >
                  <DocumentCard document={document} />
                </Col>
              );
            })}
          </Row>
          <Link
            className="absolute right-0 bottom-[-10px] text-[blue] hover:opacity-[0.4]"
            to={"/documents"}
          >
            View all &rarr;
          </Link>
        </div>

        <div className="p-5  relative">
        <p className="text-3xl font-bold">Flashcards</p>
          <Row gutter={[16, 40]} className="pt-[10px]">
            {flashcards?.slice(0, 4).map((flashcard) => {
              return (
                <Col
                  key={document.id}
                  className="gutter-row"
                  xs={24}
                  sm={12}
                  md={6}
                >
                  <FlashCard flashcard={flashcard} />
                </Col>
              );
            })}
          </Row>
          <Link
             className="absolute right-0 bottom-[-2px] text-[blue] hover:opacity-[0.4]"
            to={"/flashcards"}
          >
            View all &rarr;
          </Link>
        </div>
      </div>
    </HomePageStyle>
  );
};
export default HomePage;
