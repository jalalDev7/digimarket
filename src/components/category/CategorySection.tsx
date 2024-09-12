import React from "react";
import HomeNavbar from "../Home/HomeNavbar";
import HomeFooter from "../Home/HomeFooter";
import CategoryProductsShow from "./CategoryProductsShow";

const CategorySection = (props: { categoryId: string }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <HomeNavbar />
      <main className="flex-1 items-center justify-center my-16">
        <CategoryProductsShow catId={props.categoryId} />
      </main>
      <HomeFooter />
    </div>
  );
};

export default CategorySection;
