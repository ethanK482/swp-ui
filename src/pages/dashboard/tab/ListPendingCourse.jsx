import useAllPublicCourse from "../../../hook/course/useAllUserCourse";
//import useAllExpertCourse from "../../../hook/course/useAllExpertCourse";

import {
    Button,
    Table,
 
} from "antd";
import { useMutation,  } from "@tanstack/react-query";
import api from "../../../api/http";
import { useNavigate } from 'react-router-dom';

const ListPendingCourse = () => {
    const courses = useAllPublicCourse();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const activeMutation = useMutation({
        mutationFn: ({ formData}) => {
            return api.put(`/course/acitve`, formData, {
                headers: {
                    "content-type": "multipart/form-data",
                    Authorization: token,
                },
            });
        },
    });

    const handleActive = (courseId) => {
        const formData = new FormData();
        formData.append("courseId", courseId + "");
        activeMutation.mutate({formData });
    };
    const pendingCourses = courses?.filter(course => course.state === "pending");

    const dataSource = pendingCourses?.map((course) => {
        return {
    
            courseName: course.name,
            courseId: course.id,
            topic:course.topicId,
            descriptions: course.description ,
            action: (
                <>
                    <Button
                        className="mr-2"
                        style={{ color: "blue" }}
                        onClick={() => handleActive(course.id)}
                    >
                        Active
                    </Button>
                    <Button onClick={() => navigate(`/course/detail/${course.id}`)}>
                        Detail
                    </Button>
                </>
            ),
        };
    });
   
    const columns = [
        {
            title: 'CoursedName',
            dataIndex: 'coursedName',
            key: 'coursedName',
        },
        {
            title: 'CourseId',
            dataIndex: 'courseId',
            key: 'courseId',
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

            <h1 className="mt-12 mb-16 text-5xl font-bold">List Pending Courses</h1>
            <Table dataSource={dataSource} columns={columns} />




        </div>
    );
}
export default ListPendingCourse;
