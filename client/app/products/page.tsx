import ProductsList from "../_components/Products/ProductsList";
import { Suspense } from "react";
import LoadingSpinner from "../_components/LoadingSpinner";
import ProductsFilter from "../_components/Products/ProductsFilter";
import MobileFilterBtn from "../_components/Products/MobileFilterBtn";

export default function ProductsPage() {
  return (
    <section className="min-h-screen mt-8 px-4">
      <div className="container mx-auto">
        <h1 className="text-[22px] font-bold mb-6">All Products</h1>
        {/* Mobile Filter Button */}
        <MobileFilterBtn />
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar (hidden on mobile) */}
          <div className="hidden md:block">
            <ProductsFilter />
          </div>

          {/* Products List */}
          <div className="flex-1">
            <Suspense fallback={<LoadingSpinner />}>
              <ProductsList />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
