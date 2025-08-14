import { useRef } from "react";

function useHandleInputChange(
  search: (variable: {
    abortController: AbortController;
    searchInput: string;
  }) => void
) {
  const searchAbortController = useRef<AbortController>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout>(null);

  // Handle input change with direct fetch
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Clear previous timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Clear previous request
    if (searchAbortController.current) {
      searchAbortController.current.abort();
    }
    searchAbortController.current = new AbortController();

    // Debounce search
    debounceTimeoutRef.current = setTimeout(() => {
      if (value.trim().length > 0 && searchAbortController.current) {
        search({
          abortController: searchAbortController.current,
          searchInput: value,
        });
      }
    }, 100);
  };
  return handleInputChange;
}

export default useHandleInputChange;
