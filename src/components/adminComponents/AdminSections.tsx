"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import AdminOrders from "./AdminOrders";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { IoMdArrowDropright } from "react-icons/io";
import AdminMaxWidthWrapper from "./AdminMaxWidthWrapper";
import AdminProductsList from "./AdminProductsList";
import AdminCategories from "./AdminCategories";

const AdminSections = () => {
  const searchParams = useSearchParams();

  const section = searchParams.get("section");
  return (
    <div className="mt-8 flex flex-col gap-2">
      <AdminMaxWidthWrapper>
        <div className="flex flex-row w-full justify-start gap-1 text-muted-foreground items-center mb-4">
          <MdOutlineAdminPanelSettings className="size-6 mr-2" />
          <h3>Admin</h3>
          <IoMdArrowDropright className="size-4" />
          {section ? section : "orders"}
        </div>
      </AdminMaxWidthWrapper>
      {section === "orders" || !section ? (
        <AdminOrders />
      ) : section === "products" ? (
        <AdminProductsList />
      ) : section === "categories" ? (
        <AdminCategories />
      ) : (
        <AdminOrders />
      )}
    </div>
  );
};

export default AdminSections;
