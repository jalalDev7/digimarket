import ProductSection from "@/components/Product/ProductSection";
import React from "react";
interface PageProps {
  params: {
    productid: string;
  };
}

const page = ({ params }: PageProps) => {
  console.log(params);
  return <ProductSection id={params.productid} />;
};

export default page;
