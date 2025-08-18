import LogoImage from "@/public/icon.png";
import Image from "next/image";
import Link from "next/link";

function Logo({ className }: { className?: string }) {
  return (
    <Link
      className={`${className} text-xs sm:text-lg font-bold text-gray-900 flex items-center gap-4`}
      href="/"
    >
      <Image src={LogoImage} alt="Website Logo Icon" />
      <span>Style Store</span>
    </Link>
  );
}

export default Logo;
