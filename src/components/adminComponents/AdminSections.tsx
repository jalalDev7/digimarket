"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import AdminOrders from "./AdminOrders";

const AdminSections = () => {
  const searchParams = useSearchParams();

  const section = searchParams.get("section");
  return (
    <div className="mt-4">
      {section === "orders" || !section ? <AdminOrders /> : <AdminOrders />}
    </div>
  );
};

export default AdminSections;
