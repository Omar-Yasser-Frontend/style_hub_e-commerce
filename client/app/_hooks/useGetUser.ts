import { getCookie } from "@/app/_utils/authApi";
import { useQuery } from "@tanstack/react-query";

export default function useGetUser() {
  const {
    data: user,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCookie,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return { user, isPending, isError, error };
}
