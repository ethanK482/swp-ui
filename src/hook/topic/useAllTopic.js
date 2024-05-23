import { useQuery } from "@tanstack/react-query";
import api from "../../api/http";

const useAllTopic = () => {
  return useQuery({
    queryKey: ["TOPIC"],
    queryFn: () => api.get("/topics", {}),
  })?.data?.data;
};
export default useAllTopic;
