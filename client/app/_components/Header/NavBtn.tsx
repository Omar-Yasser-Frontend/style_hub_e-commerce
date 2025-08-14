import Link from "next/link";
import React from "react";

function NavBtn({
  children,
  className,
  onClick,
  href,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void | undefined;
  href?: string;
}) {
  const styles = `${
    className?.includes("bg-") ? "" : "bg-primary"
  } min-w-8 min-h-8 sm:min-w-10 sm:min-h-10 flex items-center justify-center rounded-lg cursor-pointer hover:contrast-90`;
  if (href)
    return (
      <Link href={href} className={`${styles} ${className ? className : ""}`}>
        {children}
      </Link>
    );

  return (
    <button
      onClick={onClick}
      className={`${styles} ${className ? className : ""}`}
    >
      {children}
    </button>
  );
}

export default NavBtn;
