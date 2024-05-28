import { useQuery } from "@tanstack/react-query";
import api from "../../api/http";

const useAllExpert = () => {
  return useQuery({
    queryKey: ["PUBLIC_EXPERT"],
    queryFn: () =>
      api.get("/public/experts"),
  })?.data?.data;
};
export default useAllExpert;
