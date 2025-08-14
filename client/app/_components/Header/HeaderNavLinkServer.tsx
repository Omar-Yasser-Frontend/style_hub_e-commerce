import Link from "next/link";
import React from "react";

function HeaderNavLinkServer({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <Link
      href={href}
      className={`text-gray-900 hover:text-gray-600 w-full md:w-auto block py-6 px-4 md:px-3 md:py-2 text-sm font-medium hover:bg-gray-100 md:hover:bg-transparent`}
    >
      {children}
    </Link>
  );
}

export default HeaderNavLinkServer;
