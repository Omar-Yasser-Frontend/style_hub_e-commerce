import useEscape from "@/app/_hooks/useEscape";
import useOutsideClick from "@/app/_hooks/useOutsideClick";
import useSearch from "@/app/_hooks/useSearch";
import { IoSearchOutline } from "react-icons/io5";
import CloseSearchBtn from "./CloseSearchBtn";
import SearchList from "./SearchList";
import SearchSpinner from "./SearchSpinner";
import useHandleInputChange from "./useHandleInputChange";

function SearchModal({ close }: { close: () => void }) {
  const { resultProds, isPending, search } = useSearch();
  const ref = useOutsideClick(close, true) as React.RefObject<HTMLDivElement>;
  const handleInputChange = useHandleInputChange(
    search as (variable: {
      abortController: AbortController;
      searchInput: string;
    }) => void
  );
  useEscape(close);

  return (
    <div className="fixed z-[1000] inset-0 flex items-start justify-center pt-20 bg-[#ffffff4a]">
      <div className="absolute inset-0" onClick={close} />

      <div
        ref={ref}
        className="relative w-[90vw] sm:w-[60vw] max-w-2xl rounded-lg shadow-xl bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Container */}
        <div className="relative flex items-center p-4 border-b border-gray-100">
          <div className="absolute left-6 flex items-center justify-center">
            <IoSearchOutline size={20} className="text-gray-400" />
          </div>

          <input
            autoComplete="off"
            type="text"
            autoFocus
            placeholder="Search products..."
            className="w-full h-12 pl-12 pr-12 text-lg bg-transparent outline-none"
            onChange={handleInputChange}
          />
          {isPending && <SearchSpinner />}

          <CloseSearchBtn close={close} />
        </div>

        <SearchList
          resultProds={resultProds}
          isPending={isPending}
          onClose={close}
        />
      </div>
    </div>
  );
}

export default SearchModal;
