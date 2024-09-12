"use client";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { trpc } from "@/app/_trpc/client";
import HomeProductsCards from "./HomeProductsCards";

const HomeProducts = () => {
  const { data: categories } = trpc.getCatgories.useQuery();
  return (
    <section className="py-12 md:py-16 lg:py-20 space-y-8">
      {categories
        ? categories.map((cat) => (
            <div
              key={cat.id}
              className="container px-4 md:px-6 items-center justify-center mx-auto"
            >
              <div className="flex flex-col md:flex-row items-center justify-between mb-8">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">{cat.title} Products</h2>
                  <p className="text-muted-foreground">
                    Discover our latest and greatest products.
                  </p>
                </div>
                <Link
                  href={`/category/${cat.id}`}
                  className="mt-4 md:mt-0"
                  prefetch={false}
                >
                  <Button variant="outline">View More</Button>
                </Link>
              </div>
              <HomeProductsCards cat={cat.id} />
            </div>
          ))
        : null}
    </section>
  );
};

export default HomeProducts;
