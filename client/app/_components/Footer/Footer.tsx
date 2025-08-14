import Link from "next/link";
import { FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";

function Footer() {
  return (
    <footer className="my-10 pt-10 px-5 flex flex-col items-center gap-6 container mx-auto">
      <ul className="flex flex-col sm:flex-row items-center justify-between w-full gap-6 mb-6">
        <li>
          <Link href="#">About us</Link>
        </li>
        <li>
          <Link href="#">Contact</Link>
        </li>
        <li>
          <Link href="#">FAQ</Link>
        </li>
        <li>
          <Link href="#">Privacy Policy</Link>
        </li>
        <li>
          <Link href="#">Terms of service</Link>
        </li>
      </ul>
      <ul className="flex items-center justify-center gap-4 mb-6">
        <li>
          <a
            href="#"
            aria-label="Twitter"
            className="hover:text-[#1DA1F2] transition-colors"
          >
            <FaTwitter size={24} />
          </a>
        </li>
        <li>
          <a
            href="#"
            aria-label="Instagram"
            className="hover:text-[#E1306C] transition-colors"
          >
            <FaInstagram size={24} />
          </a>
        </li>
        <li>
          <a
            href="#"
            aria-label="Facebook"
            className="hover:text-[#1877F3] transition-colors"
          >
            <FaFacebook size={24} />
          </a>
        </li>
      </ul>
      <p className="text-center">@2024 StyleHub. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
