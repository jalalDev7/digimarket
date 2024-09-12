"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";
import { trpc } from "@/app/_trpc/client";
import Link from "next/link";

const HomeSlider = () => {
  const { data: sliders } = trpc.getSliders.useQuery();
  return (
    <Carousel className="w-full max-w-full overflow-hidden z-10">
      <CarouselPrevious />
      <CarouselNext />
      <CarouselContent>
        {sliders
          ? sliders.map((slide) => (
              <CarouselItem key={slide.id}>
                <Link href={slide.link}>
                  <Image
                    src={slide.imageLink}
                    width="1920"
                    height="600"
                    alt="Featured Product"
                    quality={100}
                    className="w-full h-[400px] md:h-[600px] object-cover"
                    style={{ aspectRatio: "1920/600", objectFit: "cover" }}
                  />
                </Link>
              </CarouselItem>
            ))
          : null}
      </CarouselContent>
    </Carousel>
  );
};

export default HomeSlider;
