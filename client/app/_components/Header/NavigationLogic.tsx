import HeaderCartBtn from "./HeaderCartBtn";
import Navigation from "./Navigation";
import NavSearchInput from "./NavSearchInput";
import ProfileNav from "./ProfileNav";

function NavigationLogic() {
  return (
    <div className="flex flex-grow items-center">
      <Navigation />
      <div id="head-nav" className="flex items-center ml-auto">
        <div className="space-x-2 flex ml-8">
          <NavSearchInput />
          {/* <NavBtn href="/wishlist">
            <AiOutlineHeart />
          </NavBtn> */}
          <HeaderCartBtn />
        </div>
        <ProfileNav />
      </div>
    </div>
  );
}

export default NavigationLogic;
