import { useQuery } from "@tanstack/react-query";
import api from "../../api/http";

const useAllFlashCard = () => {
  return useQuery({
    queryKey: ["flashcards"],
    queryFn: () => api.get("/flashcards"),
    cacheTime: Infinity, 
    staleTime: Infinity, 
    refetchOnWindowFocus: false,
  })?.data?.data;
};
export default useAllFlashCard;
