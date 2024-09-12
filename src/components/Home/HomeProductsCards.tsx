"use client";
import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import Image from "next/image";
import { trpc } from "@/app/_trpc/client";

const HomeProductsCards = (props: { cat: string | undefined }) => {
  const { data: getProducts } = trpc.getHomeProducts.useQuery({
    cat: props.cat,
  });
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
      {getProducts
        ? getProducts.map((product) => (
            <Card key={product.id}>
              <Image
                src={product.imageLink}
                width="400"
                height="300"
                alt="Product 1"
                className="w-full h-[200px] object-cover rounded-t-xl"
                style={{ aspectRatio: "400/300", objectFit: "cover" }}
              />
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <p className="text-muted-foreground">{product.price} MAD</p>
              </CardContent>
              <CardFooter>
                <Button variant="default" className="w-full">
                  Buy now
                </Button>
              </CardFooter>
            </Card>
          ))
        : null}
    </div>
  );
};

export default HomeProductsCards;
