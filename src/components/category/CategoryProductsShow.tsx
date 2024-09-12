"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { trpc } from "@/app/_trpc/client";
import Link from "next/link";

const CategoryProductsShow = (props: { catId: string }) => {
  const { data: products } = trpc.getProductByCat.useQuery({
    catId: props.catId,
  });
  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">
        {products ? products[0].categories?.title : null}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products
          ? products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
              >
                <Image
                  src={product.imageLink}
                  alt={product.title}
                  width={200}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-primary text-lg font-semibold mb-2">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{product.price} MAD</p>
                  </div>
                  <Link href={`/product/${product.id}`}>
                    <Button className="w-full">Buy Now</Button>
                  </Link>
                </div>
              </div>
            ))
          : null}
      </div>
    </section>
  );
};

export default CategoryProductsShow;
