import { Suspense } from "react";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
import RatingFilter from "./RatingFilter";
import LoadingSpinnerMini from "../LoadingSpinnerMini";

const ratings = ["4+", "3+", "2+", "1+"];

function ProductsFilter() {
  //   function handleParamsFilter(
  //     filter: string,
  //     value: string,
  //     single: boolean = false
  //   ): void {
  //     const urlSearchParams = new URLSearchParams(searchParams.toString());
  //     if (!single) {
  //       const getCurrFilterValues = urlSearchParams.get(filter)?.split(",") || [];
  //       const fixedFilter = getCurrFilterValues.includes(value)
  //         ? getCurrFilterValues.filter((filter) => filter !== value)
  //         : [...getCurrFilterValues, value];
  //       if (fixedFilter.length)
  //         urlSearchParams.set(filter, fixedFilter.join(","));
  //       else urlSearchParams.delete(filter);
  //     } else {
  //       urlSearchParams.set(filter, value);
  //     }
  //     router.push(`${pathname}?${urlSearchParams.toString()}`);
  //   }

  return (
    <aside className="w-64 flex-shrink-0 h-full px-4 pb-4">
      <div className="space-y-6">
        <Suspense fallback={<LoadingSpinnerMini />}>
          <RatingFilter>
            <option value="">All Ratings</option>
            {ratings.map((rating) => (
              <option key={rating} value={rating}>
                {rating} Stars
              </option>
            ))}
          </RatingFilter>
        </Suspense>

        <PriceFilter />

        <Suspense fallback={<LoadingSpinnerMini />}>
          <CategoryFilter />
        </Suspense>

        {/* <AditonalFilter /> */}
      </div>
    </aside>
  );
}

export default ProductsFilter;
