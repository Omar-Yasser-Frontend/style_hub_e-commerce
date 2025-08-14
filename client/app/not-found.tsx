import Link from "next/link";
import { BiHome } from "react-icons/bi";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-6">
      <div className="max-w-md mx-auto text-center bg-white rounded-xl shadow-lg p-8">
        <div className="text-8xl font-bold text-burgundy mb-4">404</div>

        <h1 className="text-2xl font-bold text-black-txt mb-4">
          Page Not Found
        </h1>

        <p className="text-gray-600 mb-8 leading-relaxed">
          Oops! The page you&apos;re looking for doesn&apos;t exist. It might
          have been moved, deleted, or you entered the wrong URL.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="py-3 px-6 text-white bg-accent rounded-lg hover:contrast-80 font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <BiHome className="w-5 h-5" />
            Back to Home
          </Link>

          <Link
            href="/products"
            className="py-3 px-6 text-burgundy border-2 border-burgundy rounded-lg hover:bg-burgundy hover:text-white font-semibold transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
