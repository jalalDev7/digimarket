import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import Image from "next/image";

const HomeProducts = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6 items-center justify-center mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <p className="text-muted-foreground">
              Discover our latest and greatest products.
            </p>
          </div>
          <Link href="#" className="mt-4 md:mt-0" prefetch={false}>
            <Button variant="outline">View More</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          <Card>
            <Image
              src="/placeholder.svg"
              width="400"
              height="300"
              alt="Product 1"
              className="w-full h-[200px] object-cover rounded-t-lg"
              style={{ aspectRatio: "400/300", objectFit: "cover" }}
            />
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold">Product 1</h3>
              <p className="text-muted-foreground">$49.99</p>
            </CardContent>
            <CardFooter>
              <Button variant="default" className="w-full">
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <Image
              src="/placeholder.svg"
              width="400"
              height="300"
              alt="Product 2"
              className="w-full h-[200px] object-cover rounded-t-lg"
              style={{ aspectRatio: "400/300", objectFit: "cover" }}
            />
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold">Product 2</h3>
              <p className="text-muted-foreground">$79.99</p>
            </CardContent>
            <CardFooter>
              <Button variant="default" className="w-full">
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <Image
              src="/placeholder.svg"
              width="400"
              height="300"
              alt="Product 3"
              className="w-full h-[200px] object-cover rounded-t-lg"
              style={{ aspectRatio: "400/300", objectFit: "cover" }}
            />
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold">Product 3</h3>
              <p className="text-muted-foreground">$99.99</p>
            </CardContent>
            <CardFooter>
              <Button variant="default" className="w-full">
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <Image
              src="/placeholder.svg"
              width="400"
              height="300"
              alt="Product 4"
              className="w-full h-[200px] object-cover rounded-t-lg"
              style={{ aspectRatio: "400/300", objectFit: "cover" }}
            />
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold">Product 4</h3>
              <p className="text-muted-foreground">$59.99</p>
            </CardContent>
            <CardFooter>
              <Button variant="default" className="w-full">
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HomeProducts;
