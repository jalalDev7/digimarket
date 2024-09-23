import React from "react";
import HomeNavbar from "./HomeNavbar";
import HomeSlider from "./HomeSlider";
import HomeProducts from "./HomeProducts";
import HomeTrust from "./HomeTrust";
import HomeFooter from "./HomeFooter";
import HomeMarquee from "./HomeMarquee";

const HomeSection = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <HomeNavbar />
      <main className="flex-1">
        <HomeSlider />
        <HomeProducts />
        <HomeMarquee />
        <HomeTrust />
      </main>
      <HomeFooter />
    </div>
  );
};

export default HomeSection;
