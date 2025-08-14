"use client";

import { Swiper, SwiperSlide, type SwiperRef } from "swiper/react";
import "swiper/css";
import Product from "@/app/_types/Products";
import ProductCard from "../ProductCard";
import { useRef } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

function ProductsSwiper({ products }: { products: Product[] }) {
  const ref = useRef<SwiperRef>(null);

  return (
    <div className="relative">
      <div
        className="cursor-pointer hover:contrast-90 absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 z-50 bg-white w-10 aspect-square rounded-full shadow-lg flex items-center justify-center"
        onClick={() => ref.current?.swiper.slideNext()}
      >
        <BiChevronRight />
      </div>
      <Swiper
        ref={ref}
        spaceBetween={12}
        slidesPerView={1}
        breakpoints={{
          480: { slidesPerView: 1.5 },
          768: { slidesPerView: 2 },
          992: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {products.map((product, idx: number) => (
          <SwiperSlide key={idx}>
            <ProductCard
              id={product.id}
              price={product.price}
              title={product.title}
              img={product.thumbnail}
            />
          </SwiperSlide>
        ))}
        <SwiperSlide>
          <Link
            href={"/products"}
            className="flex items-center justify-center w-[230px] h-[320px] bg-white shadow-sm relative flex-col"
          >
            <div className="w-20 h-20 rounded-full shadow-sm flex items-center justify-center">
              <FaArrowRight />
            </div>
            <p>See More</p>
          </Link>
        </SwiperSlide>
      </Swiper>
      <div
        onClick={() => ref.current?.swiper.slidePrev()}
        className="cursor-pointer hover:contrast-90 absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 z-50 bg-white w-10 aspect-square rounded-full shadow-lg flex items-center justify-center"
      >
        <BiChevronLeft />
      </div>
    </div>
  );
}

export default ProductsSwiper;
