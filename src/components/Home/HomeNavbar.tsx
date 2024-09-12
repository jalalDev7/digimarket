"use client";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { trpc } from "@/app/_trpc/client";

const HomeNavbar = () => {
  const { data: getCats } = trpc.getCatgories.useQuery();
  return (
    <header className="bg-background border-b">
      <div className="container px-4 md:px-6 py-4 flex items-center justify-between mx-auto">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <MountainIcon className="w-6 h-6" />
          <span className="text-lg font-semibold">Digi Market</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground"
            prefetch={false}
          >
            Home
          </Link>
          {getCats
            ? getCats.map((cat) => (
                <Link
                  key={`category-${cat.id}`}
                  href={`/category/${cat.id}`}
                  className="text-muted-foreground hover:text-foreground"
                  prefetch={false}
                >
                  {cat.title}
                </Link>
              ))
            : null}
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground"
            prefetch={false}
          >
            About
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground"
            prefetch={false}
          >
            Contact
          </Link>
        </nav>
        <Button variant="outline" size="sm" className="md:hidden">
          <MenuIcon className="w-5 h-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>
    </header>
  );
};

export default HomeNavbar;

function MountainIcon(props: { className: string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
function MenuIcon(props: { className: string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
