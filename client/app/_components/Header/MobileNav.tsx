"use client";

import { useState } from "react";
import MobileShowNavigation from "./MobileShowNavigation";
import MobileNavModal from "./MobileNavModal";

function MobileNav() {
  const [active, setActive] = useState(false);
  const close = () => setActive(false);
  return (
    <>
      <MobileShowNavigation setActive={setActive} />
      {active && window.innerWidth < 768 && <MobileNavModal close={close} />}
    </>
  );
}

export default MobileNav;
