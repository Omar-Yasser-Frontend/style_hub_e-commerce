import Image from "next/image";
import PrimaryBtn from "../PrimaryBtn";
import HeroImage from "@/public/hero-section-image2.png";

function HeroSection() {
  return (
    <section>
      <div className="flex items-end container mx-auto px-4 sm:px-6 lg:px-8 mt-9 mb-4 relative overflow-hidden rounded-lg">
        <div className="relative bg-[#e1dacf] w-full rounded-lg overflow-hidden">
          <Image
            src={HeroImage}
            className="w-xs mx-auto max-w-full"
            alt="Hero Section Image of modern outfit stlye"
          />
          <div className="absolute inset-0 bg-[rgba(0,0,0,0.308)] flex flex-col h-full justify-end">
            <div className="pl-6 pb-6 text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Elevate Your Style
              </h1>
              <p className="text-xl md:text-2xl mb-6">
                Discover the latest trends in fashion and lifestyle
              </p>
              <PrimaryBtn href="/new-arrival">Shop Now</PrimaryBtn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
