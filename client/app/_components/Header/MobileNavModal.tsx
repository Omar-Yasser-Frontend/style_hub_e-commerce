import { createPortal } from "react-dom";
import ModalV2 from "../ModalV2";
import HeaderNavLink from "./HeaderNavLink";
import Logo from "./Logo";

function MobileNavModal({ close }: { close: () => void }) {
  return createPortal(
    <ModalV2 close={close} dir="to-right">
      {/* <ModalV2.Close close={close} className="mt-6 mr-6" /> */}
      <nav className=" flex h-full w-full">
        <ul
          onClick={close}
          className="flex flex-col w-full md:space-x-9 text-sm font-medium"
        >
          <li>
            <Logo className="hover:bg-gray-100 px-4 py-6 flex justify-center" />
          </li>
          <li>
            <HeaderNavLink href="/products">New Arrival</HeaderNavLink>
          </li>
          <li>
            <HeaderNavLink href="/products?category=men's">Men</HeaderNavLink>
          </li>
          <li>
            <HeaderNavLink href="/products?category=women's">
              Women
            </HeaderNavLink>
          </li>
        </ul>
      </nav>
    </ModalV2>,
    document.body
  );
}

export default MobileNavModal;
