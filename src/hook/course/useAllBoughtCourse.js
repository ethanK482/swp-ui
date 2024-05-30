import { useQuery } from "@tanstack/react-query";
import api from "../../api/http";

const useAllBoughtCourse = () => {
    const token = localStorage.getItem("token");
  return useQuery({
    queryKey: ["BOUGHT_COURSE"],
    queryFn: () =>
      api.get("/course/bought", { headers: {
        Authorization: token,
      },}),
  })?.data?.data;
};
export default useAllBoughtCourse;
