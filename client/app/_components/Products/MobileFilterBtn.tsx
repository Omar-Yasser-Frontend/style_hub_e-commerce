"use client";

import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import ModalV2 from "../ModalV2";
import PrimaryBtn from "../PrimaryBtn";
import ProductsFilter from "./ProductsFilter";

function MobileFilterBtn() {
  const [showFilter, setShowFilter] = useState(false);
  const toggleFilter = () => setShowFilter((filter) => !filter);
  return (
    <>
      <div className="md:hidden mb-4 flex justify-end">
        <PrimaryBtn
          onClick={(e) => {
            e.stopPropagation();
            toggleFilter();
          }}
        >
          <FaFilter />
        </PrimaryBtn>
      </div>
      {showFilter && (
        <ModalV2 close={() => setShowFilter(false)} dir="to-right">
          <ModalV2.Close
            className="pt-6 pr-6"
            close={() => setShowFilter(false)}
          />
          <ProductsFilter />
        </ModalV2>
      )}
    </>
  );
}

export default MobileFilterBtn;
