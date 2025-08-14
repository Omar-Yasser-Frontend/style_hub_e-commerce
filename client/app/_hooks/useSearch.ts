import { useMutation } from "@tanstack/react-query";
import { search as searchApi } from "../_utils/userApi";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

const errorMessage = {
  SEARCH_QUERY_MISSING: "Please input text to search",
};

function useSearch() {
  const {
    mutate: search,
    data: resultProds,
    isPending,
  } = useMutation({
    mutationFn: searchApi,
    onError: (err: AxiosError<{ code: string; name: string }>) => {
      if (err.response?.data?.name !== "AbortError") {
        toast.error(
          errorMessage[err.response?.data?.code as keyof typeof errorMessage] ||
            "Something went wrong"
        );
      }
    },
  });

  return { resultProds, search, isPending };
}

export default useSearch;
