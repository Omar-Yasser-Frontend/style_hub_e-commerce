import Link from "next/link";
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";
import { SearchProduct } from "@/app/_types/search";

interface SearchCardProps {
  product: SearchProduct;
  onClose: () => void;
}

function SearchCard({ product, onClose }: SearchCardProps) {
  return (
    <Link
      href={`/products/details/${product.id}`}
      onClick={onClose}
      className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors group"
    >
      {/* Product Image */}
      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={48}
          height={48}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 ml-3 min-w-0">
        <h4 className="text-sm font-medium text-gray-900 truncate">
          {product.title}
        </h4>
        <p className="text-sm text-gray-500">${product.price}</p>
      </div>

      <IoIosArrowForward
        size={16}
        className="text-gray-400 group-hover:text-gray-600 flex-shrink-0"
      />
    </Link>
  );
}

export default SearchCard;
