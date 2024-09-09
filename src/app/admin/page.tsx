import AdminSections from "@/components/adminComponents/AdminSections";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <main className="flex flex-col w-full bg-background min-h-screen">
      <div className="flex flex-row  w-full px-4 py-2 border-b border-primary">
        <div className="flex flex-row w-full items-center justify-between max-w-screen-xl mx-auto">
          <div className="flex flex-row gap-4 w-full text-primary-foreground">
            <Link href={"/"} className=" rounded-lg">
              Store
            </Link>
            <Link href={"/admin?section=orders"} className=" rounded-lg">
              Orders
            </Link>
            <Link href={"/admin?section=products"} className=" rounded-lg">
              Products
            </Link>
            <Link href={"/admin?section=settings"} className=" rounded-lg">
              Settings
            </Link>
          </div>
          <Link
            href={"http://localhost:3000/api/auth/signout"}
            className="bg-muted text-primary px-4 py-2 font-semibold text-nowrap rounded-lg"
          >
            Log out
          </Link>
        </div>
      </div>
      <AdminSections />
    </main>
  );
};

export default page;
