import Footer from "./_components/Footer/Footer";
import CategorySection from "./_components/HomePage/CategorySection";
import HeroSection from "./_components/HomePage/HeroSection";
import JoinCommunity from "./_components/HomePage/JoinCommunity";
import NewArrivalSection from "./_components/HomePage/NewArrivalSection";

const HomePage = () => {
  return (
    <>
      <div className="px-4">
        <HeroSection />

        <CategorySection />

        <NewArrivalSection />

        <JoinCommunity />
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
