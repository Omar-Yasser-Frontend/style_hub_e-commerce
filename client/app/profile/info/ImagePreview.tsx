"use client";

import Image from "next/image";
import { useRef, useState } from "react";

function ImagePreview({ userImage }: { userImage: string }) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const imageFileRef = useRef<undefined | File>(undefined);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    imageFileRef.current = e.target.files?.[0];

    if (imageFileRef.current) {
      // setImage(file.name); // This line is removed as per the edit hint
      setImagePreview(URL.createObjectURL(imageFileRef.current));
    }
  };
  return (
    <>
      <div className="w-20 aspect-square rounded-full overflow-hidden bg-gray-100 border relative">
        <Image
          src={imagePreview || userImage || "/default-user.jpg"}
          alt="User profile"
          fill
          className="object-cover w-full h-full"
        />
      </div>
      <label className="block">
        <span className="sr-only">Choose profile photo</span>
        <input
          type="file"
          accept="image/*"
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-white hover:file:bg-accent/80"
          name="profilePic"
          onChange={handleImageChange}
        />
      </label>
    </>
  );
}

export default ImagePreview;
