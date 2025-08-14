import { IoSearchOutline } from "react-icons/io5";
import SearchCard from "./SearchCard";
import { SearchProduct } from "@/app/_types/search";

interface SearchListProps {
  resultProds: SearchProduct[] | undefined;
  isPending: boolean;
  onClose: () => void;
}

function SearchList({ resultProds, isPending, onClose }: SearchListProps) {
  return (
    <div className="max-h-96 overflow-y-auto">
      {/* Loading State */}
      {isPending && (
        <div className="p-6 text-center">
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            <span className="text-gray-600">Searching products...</span>
          </div>
        </div>
      )}

      {/* Search Results */}
      {resultProds && resultProds.length > 0 && (
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-500 mb-3">
            Found {resultProds.length} product
            {resultProds.length !== 1 ? "s" : ""}
          </h3>
          <div className="space-y-2">
            {resultProds.map((product) => (
              <SearchCard
                key={product.id}
                product={product}
                onClose={onClose}
              />
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {resultProds && resultProds.length === 0 && (
        <div className="p-6 text-center">
          <div className="text-gray-500">
            <p className="text-sm">No products found</p>
            <p className="text-xs mt-2">
              Try different keywords or check spelling
            </p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isPending && !resultProds && (
        <div className="p-6 text-center">
          <div className="text-gray-500">
            <IoSearchOutline size={32} className="mx-auto mb-3 text-gray-300" />
            <p className="text-sm">Search for products</p>
            <p className="text-xs mt-1">
              Enter keywords to find what you&apos;re looking for
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchList;
