import { getCurrentUser } from "@/services/auth";
import { queryOptions } from "@tanstack/react-query";

export const userQueryOptions = queryOptions({
  queryKey: ["get-user"],
  queryFn: getCurrentUser,
  staleTime: 1000 * 60 * 10,
});
