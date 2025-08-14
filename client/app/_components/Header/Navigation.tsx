import HeaderNavLinkServer from "./HeaderNavLinkServer";
import MobileNav from "./MobileNav";

function Navigation() {
  return (
    <nav className="items-center hidden md:flex">
      <ul className="flex space-x-9 text-sm font-medium">
        <li>
          <HeaderNavLinkServer href="/products">
            New Arrival
          </HeaderNavLinkServer>
        </li>
        <li>
          <HeaderNavLinkServer href="/products?category=men's">
            Men
          </HeaderNavLinkServer>
        </li>
        <li>
          <HeaderNavLinkServer href="/products?category=women's">
            Women
          </HeaderNavLinkServer>
        </li>
      </ul>
      <MobileNav />
    </nav>
  );
}

export default Navigation;
