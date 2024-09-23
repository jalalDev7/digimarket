import Image from "next/image";
import React from "react";

const data = [
  {
    id: 1,
    title: "CIH Banque",
    image: "/cih.png",
  },
  {
    id: 2,
    title: "Banque populaire",
    image: "/chaabi.png",
  },
  {
    id: 3,
    title: "Paypal",
    image: "/paypal.png",
  },
  {
    id: 4,
    title: "WIZE",
    image: "/wize.png",
  },
  {
    id: 4,
    title: "Binance",
    image: "/binance.png",
  },
];
const HomeMarquee = () => {
  return (
    <div className="flex flex-row flex-wrap w-full space-x-16 bg-muted py-16 items-center justify-center">
      {data.map((item) => (
        <Image
          key={item.id}
          src={item.image}
          height={40}
          width={250}
          alt={item.title}
          className=" aspect-video object-cover"
        />
      ))}
    </div>
  );
};

export default HomeMarquee;
