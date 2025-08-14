import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import NavBtn from "./NavBtn";
import { RxHamburgerMenu } from "react-icons/rx";

function MobileShowNavigation({
  setActive,
}: {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isDomReady, setIsDomReady] = useState(false);

  useEffect(() => {
    if (!isDomReady) setIsDomReady(true);
  }, [isDomReady]);
  return (
    <>
      {isDomReady &&
        createPortal(
          <NavBtn
            className="block md:hidden ml-2"
            onClick={(e) => {
              e.stopPropagation();
              setActive((active) => !active);
            }}
          >
            <RxHamburgerMenu size={26} />
          </NavBtn>,
          document.getElementById("head-nav") as HTMLElement
        )}
    </>
  );
}

export default MobileShowNavigation;
