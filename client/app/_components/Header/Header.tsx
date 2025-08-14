import Logo from "./Logo";
import NavigationLogic from "./NavigationLogic";

function Header() {
  return (
    <header className="shadow-sm border-b border-border-color">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-2 sm:gap-8">
          <div className="flex items-center">
            <Logo />
          </div>
          <NavigationLogic />
        </div>
      </div>
    </header>
  );
}

export default Header;
