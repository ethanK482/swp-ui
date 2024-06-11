import { useQuery } from "@tanstack/react-query";
import api from "../../api/http";

const useAllPost = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => api.get("/posts"),
    cacheTime: Infinity,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })?.data?.data;
};
export default useAllPost;
