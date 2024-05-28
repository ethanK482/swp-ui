import { useQuery } from "@tanstack/react-query";
import api from "../../api/http";

const useAllPublicCourse = () => {
  return useQuery({
    queryKey: ["PUBLIC_COURSE"],
    queryFn: () =>
      api.get("/public/courses"),
  })?.data?.data;
};
export default useAllPublicCourse;
