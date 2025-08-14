"use client";

import { useEffect } from "react";
import Link from "next/link";
import { BiHome, BiRefresh } from "react-icons/bi";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-6">
      <div className="max-w-md mx-auto text-center bg-white rounded-xl shadow-lg p-8">
        {/* Error Icon */}
        <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
          <svg
            className="w-10 h-10 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-black-txt mb-4">
          Something went wrong!
        </h1>

        <p className="text-gray-600 mb-6 leading-relaxed">
          We&apos;re sorry, but something unexpected happened. Please try again
          or contact support if the problem persists.
        </p>

        {process.env.NODE_ENV === "development" && (
          <details className="mb-6 text-left">
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 mb-2">
              Error Details
            </summary>
            <pre className="text-xs bg-gray-100 p-3 rounded overflow-auto text-gray-700">
              {error.message}
            </pre>
          </details>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="py-3 px-6 text-white bg-accent rounded-lg hover:contrast-80 font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <BiRefresh className="w-5 h-5" />
            Try Again
          </button>

          <Link
            href="/"
            className="py-3 px-6 text-burgundy border-2 border-burgundy rounded-lg hover:bg-burgundy hover:text-white font-semibold transition-colors"
          >
            <BiHome className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
