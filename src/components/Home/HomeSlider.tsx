import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";

const HomeSlider = () => {
  return (
    <Carousel className="w-full max-w-full overflow-hidden z-10">
      <CarouselPrevious />
      <CarouselNext />
      <CarouselContent>
        <CarouselItem>
          <Image
            src="/placeholder.svg"
            width="1920"
            height="600"
            alt="Featured Product"
            className="w-full h-[400px] md:h-[600px] object-cover"
            style={{ aspectRatio: "1920/600", objectFit: "cover" }}
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            src="/placeholder.svg"
            width="1920"
            height="600"
            alt="Featured Product"
            className="w-full h-[400px] md:h-[600px] object-cover"
            style={{ aspectRatio: "1920/600", objectFit: "cover" }}
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            src="/placeholder.svg"
            width="1920"
            height="600"
            alt="Featured Product"
            className="w-full h-[400px] md:h-[600px] object-cover"
            style={{ aspectRatio: "1920/600", objectFit: "cover" }}
          />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};

export default HomeSlider;
