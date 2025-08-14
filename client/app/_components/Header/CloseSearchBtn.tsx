import { IoCloseOutline } from "react-icons/io5";

function CloseSearchBtn({ close }: { close: () => void }) {
  return (
    <button
      onClick={close}
      className="absolute right-6 p-2 text-gray-400 hover:text-gray-600 transition-colors"
      aria-label="Close search"
    >
      <IoCloseOutline size={20} />
    </button>
  );
}

export default CloseSearchBtn;
