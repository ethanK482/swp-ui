import { useQuery } from "@tanstack/react-query";
import api from "../../api/http";

const useAdminWithdrawHistories = () => {
  const token = localStorage.getItem("token");
  return useQuery({
    queryKey: ["Withdraws"],
    queryFn: () =>
      api.get("/withdraw/all-histories", {
        headers: {
          Authorization: token,
        },
      }),
  })?.data?.data;
};

export default useAdminWithdrawHistories;
