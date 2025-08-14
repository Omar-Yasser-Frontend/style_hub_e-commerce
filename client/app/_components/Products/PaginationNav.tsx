"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function PaginationNav({ productsLenght }: { productsLenght: number }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const ref = useRef(null);

  function PageNavigation(page: string) {
    const url = new URLSearchParams(searchParams.toString());
    url.set("page", page);
    router.push(`${pathname}?${url.toString()}`, { scroll: false });
    // ref.current.style.left = Number(page) * 40 + "px";
  }

  return (
    <div className="flex justify-center items-center my-8 relative w-fit mx-auto">
      <div
        ref={ref}
        style={{ left: (Number(searchParams.get("page")) || 1) * 40 + "px" }}
        className="nav-shadow"
      ></div>
      <button
        onClick={() => {
          const page = Number(searchParams.get("page") || 1) - 1;
          if (page < 1) return;
          PageNavigation(page.toString());
        }}
        className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer transition-all"
        style={{ padding: 11 }}
      >
        <FaArrowLeft />

        <span className="sr-only">Previous</span>
      </button>
      {/* Page Links */}

      {Array.from(
        { length: Math.ceil(productsLenght / 10) },
        (_, i) => i + 1
      ).map((num) => (
        <Link
          key={num}
          scroll={false}
          href={`/products?page=${num}`}
          className="flex items-center justify-center w-10 h-10 rounded-full transition-all text-base font-medium"
        >
          {num}
        </Link>
      ))}

      <button
        onClick={() => {
          const page = Number(searchParams.get("page") || 1) + 1;
          if (page > 5) return;
          PageNavigation(page.toString());
        }}
        className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer transition-all"
        style={{ padding: 11 }}
      >
        <span className="sr-only">Next</span>
        <FaArrowRight />
      </button>
    </div>
  );
}

export default PaginationNav;
