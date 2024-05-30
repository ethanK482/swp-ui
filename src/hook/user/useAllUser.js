import { useQuery } from "@tanstack/react-query";
import api from "../../api/http";

const useAllUser = () => {
  return useQuery({
    queryKey: ["PUBLIC_USER"],
    queryFn: () =>
      api.get("/public/users"),
  })?.data?.data;
};
export default useAllUser;
