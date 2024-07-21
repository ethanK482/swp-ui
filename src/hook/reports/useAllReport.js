import { useQuery } from "@tanstack/react-query";
import api from "../../api/http";

const useAllReport = () => {
  const token = localStorage.getItem("token");
  return useQuery({
    queryKey: ["reports"],
    queryFn: () =>
      api.get("/reports", {
        headers: {
          Authorization: token,
        },
      }),
  })?.data?.data;
};
export default useAllReport;
