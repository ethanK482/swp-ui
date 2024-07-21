import { useQuery } from "@tanstack/react-query";
import api from "../../api/http";

const useAllDocuments = () => {
  return useQuery({
    queryKey: ["documents"],
    queryFn: () => api.get("/document/all"),
    cacheTime: Infinity,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })?.data?.data;
};
export default useAllDocuments;
