"use client";

import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import NavBtn from "./NavBtn";
import SearchModal from "./SearchModal";

function NavSearchInput() {
  const [show, setShow] = useState(false);
  const close = () => {
    console.log("Fired");
    setShow(false);
  };

  useEffect(() => {
    if (show) document.body.style.overflowY = "hidden";
    else document.body.style.overflowY = "visible";
  }, [show]);

  return (
    <div className="relative">
      <NavBtn onClick={() => setShow((show) => !show)}>
        <IoSearchOutline className="text-base sm:text-lg" />
      </NavBtn>

      {show && <SearchModal close={close} />}

      {/* <label htmlFor="search" className="absolute top-2 left-4">
        <IoSearchOutline size={24} />
      </label>
      <input
        autoComplete="off"
        type="text"
        placeholder="Search"
        id="search"
        className="w-40 h-10 py-2 pl-[calc(16px+24px+8px)] rounded-lg bg-primary outline-none focus:w-60"
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
      /> */}
    </div>
  );
}

export default NavSearchInput;
