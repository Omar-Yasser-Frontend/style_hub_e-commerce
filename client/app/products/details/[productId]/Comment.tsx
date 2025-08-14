"use client";

import LoadingSpinnerMini from "@/app/_components/LoadingSpinnerMini";
import useGetUser from "@/app/_hooks/useGetUser";
import React, { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import LoginToComment from "./LoginToComment";

function Comment({
  productId,
  children,
}: {
  productId: string;
  children: React.ReactNode;
}) {
  const { user, isPending, isError } = useGetUser();
  const [isHydrated, setIsHydrate] = useState(false);

  useEffect(() => {
    if (!isHydrated) setIsHydrate(true);
  }, [isHydrated]);

  if (isPending || !isHydrated) return <LoadingSpinnerMini />;

  if (isError || !user) return <LoginToComment />;

  return <CommentForm productId={productId}>{children}</CommentForm>;
}

export default Comment;
