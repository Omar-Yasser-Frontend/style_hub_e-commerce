"use client";

import {
  createComment,
  reavalidattingPath,
} from "@/app/_actions/commentActions";
import StarsSelect from "@/app/_components/Products/details/StarsSelect";
import { usePathname } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import SubmitFormBtn from "./SubmitFormBtn";

function CommentForm({
  productId,
  children,
}: {
  productId: string;
  children: React.ReactNode;
}) {
  const [stars, setStars] = useState<number>(0);
  const pathname = usePathname();
  console.log(pathname);

  return (
    <form
      action={async (formData: FormData) => {
        try {
          if (stars < 1 || stars > 5)
            throw new Error("Rating must be between 1 & 5");
          await createComment({ productId, rating: stars }, formData);
          toast.success("Comment Created");
          await reavalidattingPath(pathname);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_) {
          toast.error("Failed to create comment");
        }
      }}
      // onSubmit={(e) => {
      //   e.preventDefault();
      //   if (isPending) return;
      //   createComment({ comment, productId, rating: stars });
      // }}
      className="space-y-4"
    >
      <StarsSelect onStars={setStars} stars={stars} />

      {children}

      <SubmitFormBtn />
    </form>
  );
}

export default CommentForm;
