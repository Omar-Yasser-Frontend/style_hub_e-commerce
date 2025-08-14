import { useQuery } from "@tanstack/react-query";
import { createIntent } from "../_utils/paymentApi";

function useIntent() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["checkout"],
    queryFn: createIntent,
  });

  console.log(data);

  return { data, isPending, isError, error };
}

export default useIntent;
