import { api } from "@/lib/api";

export const getCurrentUser = async () => {
  const response = await api.me.$get();

  console.log(response);

  if (!response.ok) {
    throw new Error("Server error");
  }

  const data = await response.json();

  return data;
};
