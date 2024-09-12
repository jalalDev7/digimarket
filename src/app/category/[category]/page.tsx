import CategorySection from "@/components/category/CategorySection";
import React from "react";
interface PageProps {
  params: {
    category: string;
  };
}
const page = ({ params }: PageProps) => {
  return <CategorySection categoryId={params.category} />;
};

export default page;
