"use client";
import React, { useState } from "react";
import AdminMaxWidthWrapper from "./AdminMaxWidthWrapper";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { trpc } from "@/app/_trpc/client";
import { GiCancel, GiConfirmed } from "react-icons/gi";
import { LuLoader2 } from "react-icons/lu";
import { toast } from "@/hooks/use-toast";

const AdminOrders = () => {
  const [filtre, setFiltre] = useState("new");
  const utils = trpc.useUtils();
  const { data: orders, isLoading } = trpc.getOrders.useQuery({
    filtre: filtre,
  });
  const { mutate: update } = trpc.updateOrder.useMutation({
    onSuccess: () => {
      utils.getOrders.invalidate();

      return toast({
        title: "Order updated.",
        description: "The order has been updated. ",
        variant: "success",
      });
    },
    onError: () => {
      return toast({
        title: "Operation failed",
        variant: "destructive",
      });
    },
  });
  const handleOrder = (id: string, newState: string) => {
    update({ id: id, newState: newState });
  };
  return (
    <AdminMaxWidthWrapper>
      <div className="flex flex-col w-full text-primary-foreground items-center justify-center">
        <div className="flex flex-row gap-2 w-full items-start justify-between">
          <div className="flex flex-col w-full bg-card-foreground border border-primary-foreground rounded-lg p-4">
            <div className="flex flex-row w-full items-start justify-between">
              <div className="flex flex-col w-full">
                <h2 className="text-primary-foreground font-bold">
                  Order list
                </h2>
                <h2 className="text-muted-foreground font-normal mb-4">
                  Browse {filtre} orders
                </h2>
              </div>
              <Select onValueChange={(v) => setFiltre(v)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtre by state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>States</SelectLabel>
                    <SelectItem value="new">New orders</SelectItem>
                    <SelectItem value="confirmed">Confirmed orders</SelectItem>
                    <SelectItem value="canceled">Canceled orders</SelectItem>
                    <SelectItem value="all  ">All orders</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[100px]">Product</TableHead>

                  <TableHead>Client name</TableHead>
                  <TableHead>Client phone</TableHead>
                  <TableHead>Client adress</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders
                  ? orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium text-nowrap">
                          {order.products?.title}
                        </TableCell>

                        <TableCell>{order.clientName}</TableCell>
                        <TableCell>{order.clientPhone}</TableCell>
                        <TableCell>{order.clientAdress}</TableCell>
                        <TableCell>
                          <div
                            className={` flex rounded-lg px-2 py-1 items-center justify-center w-[120px] text-nowrap ${
                              order.state === "new"
                                ? "bg-blue-500"
                                : order.state === "canceled"
                                ? "bg-red-500"
                                : "bg-green-500"
                            }`}
                          >
                            {order.state} order
                          </div>
                        </TableCell>
                        <TableCell className="text-right flex flex-row gap-2 justify-end">
                          <GiConfirmed
                            onClick={() => handleOrder(order.id, "confirmed")}
                            className="size-6 text-green-500 cursor-pointer"
                          />
                          <GiCancel
                            onClick={() => handleOrder(order.id, "canceled")}
                            className="size-6 text-red-500 cursor-pointer"
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
            {isLoading ? (
              <div className="flex flex-col w-full items-center justify-center p-4">
                <LuLoader2 className="size-16 animate-spin" />
                <h3 className="text-muted-foreground text-xs">Loading...</h3>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </AdminMaxWidthWrapper>
  );
};

export default AdminOrders;
