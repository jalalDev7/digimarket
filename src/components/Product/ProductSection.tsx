"use client";
import React from "react";
import HomeNavbar from "../Home/HomeNavbar";
import HomeFooter from "../Home/HomeFooter";
import ProductShow from "./ProductShow";

const ProductSection = (props: { id: string }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <HomeNavbar />
      <main className="flex-1 items-center justify-center my-16">
        <ProductShow productId={props.id} />
      </main>
      <HomeFooter />
    </div>
  );
};

export default ProductSection;
