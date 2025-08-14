import Link from "next/link";

function PrimaryBtn({
  children,
  href,
  onClick,
  disabled,
  type = "button",
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}) {
  const style =
    "py-3 px-5 text-white bg-accent rounded-lg cursor-pointer hover:contrast-80 flex items-center gap-3";

  if (href)
    return (
      <Link href={href} className={`${style} inline-block`}>
        {children}
      </Link>
    );

  return (
    <button
      disabled={disabled}
      className={`${style} disabled:drop-shadow-md`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}

export default PrimaryBtn;
