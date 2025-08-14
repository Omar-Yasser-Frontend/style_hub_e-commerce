"use client";

import Product from "@/app/_types/Products";
import Image from "next/image";
import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import ModalV2 from "@/app/_components/ModalV2";
import { BiSolidChevronLeft, BiSolidChevronRight } from "react-icons/bi";
import "swiper/css";
import "swiper/css/pagination";

function ProductImage({
  product: { thumbnail, title, images },
}: {
  product: Product;
}) {
  const [zoomImage, setZoomImage] = useState<null | string>(null);
  const imageList = images && images.length > 0 ? images : [thumbnail];
  const swiperRef = useRef<SwiperType | null>(null);

  const close = () => {
    document.body.style.overflow = "auto";
    setZoomImage(null);
  };

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };
  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <>
      <div className="flex-shrink-0 w-full md:w-1/2 flex items-center justify-center">
        <div className="relative">
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            // spaceBetween={20}
            slidesPerView={1}
            pagination={{ dynamicBullets: true }}
            modules={[Pagination]}
            className="w-[400px] max-w-[88vw] relative mySwiper"
          >
            {imageList.map((img, idx) => (
              <SwiperSlide key={idx}>
                <div className="max-w-full relative w-[400px] aspect-square">
                  <Image
                    src={img}
                    alt={title}
                    fill
                    onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
                      e.stopPropagation();
                      document.body.style.overflow = "hidden";
                      setZoomImage(img);
                    }}
                    className="max-w-full rounded-lg object-contain bg-gray-100 cursor-pointer"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            onClick={handleNext}
            className="absolute top-1/2 left-full -translate-y-1/2  z-10 bg-white border border-gray-300 rounded-full p-2 shadow hover:bg-gray-100 transition w-12 justify-center aspect-square flex items-center -translate-x-1/2 cursor-pointer"
            aria-label="Next image"
            type="button"
          >
            <BiSolidChevronRight />
          </button>
          {/* Prev Button */}
          <button
            onClick={handlePrev}
            className="absolute top-1/2 right-full -translate-y-1/2 z-10 bg-white border border-gray-300 rounded-full p-2 shadow hover:bg-gray-100 transition w-12 justify-center aspect-square flex items-center translate-x-1/2 cursor-pointer"
            aria-label="Previous image"
            type="button"
          >
            <BiSolidChevronLeft />
          </button>
        </div>
      </div>
      {zoomImage && (
        <ModalV2 close={close}>
          <ModalV2.Close close={close} className="pt-6 pr-6" absolute />
          <div className="p-4 bg-red-100 rounded-md">
            <Image
              className="bg-gray-100 rounded-lg"
              src={zoomImage}
              alt={title}
              width={400}
              height={400}
            />{" "}
          </div>
        </ModalV2>
      )}
    </>
  );
}

export default ProductImage;
