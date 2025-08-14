"use client";

import Image from "next/image";
import Link from "next/link";
import defaultUserImg from "@/public/default-user.jpg";
import useGetUser from "@/app/_hooks/useGetUser";
import { FaUserAlt } from "react-icons/fa";

function ProfileNav() {
  const { user, isPending, isError } = useGetUser();

  if (isPending || isError)
    return (
      <Link
        href="/login"
        className="ml-2 sm:ml-8 px-3 sm:px-4 sm:space-x-2 bg-accent text-white min-w-10 min-h-10 flex items-center justify-center rounded-lg cursor-pointer hover:contrast-90 profile"
      >
        <FaUserAlt /> <span className="hidden sm:inline">Login</span>
      </Link>
    );

  return (
    <Link href={"/profile/info"} className="ml-2 sm:ml-8">
      <Image
        className="rounded-full hover:contrast-90"
        src={user.image || defaultUserImg}
        alt="User image"
        width={40}
        height={40}
      />
    </Link>
  );
}

export default ProfileNav;
