import { useQuery } from "@tanstack/react-query";
import api from "../../api/http";

const useExpertWithdrawHistories = () => {
  const token = localStorage.getItem("token");
  return useQuery({
    queryKey: ["histories"],
    queryFn: () =>
      api.get("/withdraw/histories", {
        headers: {
          Authorization: token,
        },
      }),
  })?.data?.data;
};
export default useExpertWithdrawHistories;
