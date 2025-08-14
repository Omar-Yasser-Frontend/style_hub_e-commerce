import Link from "next/link";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex flex-col md:flex-row bg-soft-bg"
      style={{ minHeight: "calc(100vh - 64px)" }}
    >
      {/* Sidebar Navigation */}
      <nav className="w-full md:w-64 bg-white border-r border-gray-200 p-4 flex md:flex-col flex-row gap-4 md:gap-0 md:py-8 md:px-6 shadow-sm">
        <Link
          href="/profile/info"
          className="block py-2 px-4 rounded hover:bg-accent hover:text-white font-medium transition-colors"
        >
          Info
        </Link>
        <Link
          href="/profile/password"
          className="block py-2 px-4 rounded hover:bg-accent hover:text-white font-medium transition-colors"
        >
          Change Password
        </Link>
        <Link
          href="/profile/orders"
          className="block py-2 px-4 rounded hover:bg-accent hover:text-white font-medium transition-colors"
        >
          Orders
        </Link>
        {/* Add more links here if needed */}
      </nav>
      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">{children}</main>
    </div>
  );
}
