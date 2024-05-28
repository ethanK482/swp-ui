import { useQuery } from "@tanstack/react-query";
import api from "../../api/http";


const useAllExpertCourse = () => {
    const token = localStorage.getItem("token");
  return useQuery({
    queryKey: ["EXPERT_COURSE"],
    queryFn: () => api.get("/expert/courses", {
        headers: {
          Authorization: token,
        },
      }),
  })?.data?.data;
};
export default useAllExpertCourse;