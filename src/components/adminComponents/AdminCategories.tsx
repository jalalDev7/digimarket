import React from "react";
import AdminMaxWidthWrapper from "./AdminMaxWidthWrapper";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { trpc } from "@/app/_trpc/client";
import { LuLoader2 } from "react-icons/lu";
import { IoMdAddCircleOutline } from "react-icons/io";
import AdminNewCatDialog from "./AdminNewCatDialog";

const AdminCategories = () => {
  const { data: categories, isLoading } = trpc.getCatgories.useQuery();
  return (
    <AdminMaxWidthWrapper>
      <div className="flex flex-col w-full text-primary-foreground items-center justify-center">
        <div className="flex flex-row gap-2 w-full items-start justify-between">
          <div className="flex flex-col w-full bg-card-foreground border border-primary-foreground rounded-lg p-4">
            <div className="flex flex-row w-full items-start justify-between">
              <div className="flex flex-col w-full">
                <h2 className="text-primary-foreground font-bold">
                  Categories list
                </h2>
                <h2 className="text-muted-foreground font-normal mb-4">
                  Browse all categories
                </h2>
              </div>
              <AdminNewCatDialog>
                <div className="flex flex-row gap-1 bg-card text-primary cursor-pointer rounded-lg p-2 items-center justify-center text-nowrap font-medium">
                  <IoMdAddCircleOutline className="size-6" />
                  Create new category
                </div>
              </AdminNewCatDialog>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-full">Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories
                  ? categories.map((cat) => (
                      <TableRow key={cat.id}>
                        <TableCell className="font-medium">
                          {cat.title}
                        </TableCell>
                        <TableCell>{cat.state ? "active" : "hidden"}</TableCell>
                        <TableCell className="text-right"></TableCell>
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

export default AdminCategories;
