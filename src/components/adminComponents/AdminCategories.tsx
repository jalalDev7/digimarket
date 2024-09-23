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
import { RiDeleteBinLine } from "react-icons/ri";
import { toast } from "@/hooks/use-toast";

const AdminCategories = () => {
  const utils = trpc.useUtils();
  const { data: categories, isLoading } = trpc.getCatgories.useQuery();
  const { mutate: deleteCat } = trpc.deleteCategory.useMutation({
    onSuccess: () => {
      utils.getCatgories.invalidate();
      utils.getAdminProducts.invalidate();
      return toast({
        title: "Category deleted.",
        description: "The category has been deleted.",
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
  const handleDelete = (id: string) => {
    deleteCat({ id: id });
  };
  return (
    <AdminMaxWidthWrapper>
      <div className="flex flex-col w-full text-primary-foreground items-center justify-center">
        <div className="flex flex-row gap-2 w-full items-start justify-between">
          <div className="flex flex-col w-full bg-muted text-muted-foreground border-primary-foreground rounded-lg p-4 min-h-96">
            <div className="flex flex-row w-full items-start justify-between">
              <div className="flex flex-col w-full">
                <h2 className="text-primary text-xl font-bold">
                  Categories list
                </h2>
                <h2 className="text-sm font-normal mb-4">
                  Browse all categories
                </h2>
              </div>
              <AdminNewCatDialog>
                <div className="flex flex-row gap-1 bg-primary text-secondary cursor-pointer rounded-lg p-2 items-center justify-center text-nowrap font-medium">
                  <IoMdAddCircleOutline className="size-6" />
                </div>
              </AdminNewCatDialog>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-full font-semibold">
                    Category title
                  </TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="text-right min-w-[100px] font-semibold">
                    Actions
                  </TableHead>
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
                        <TableCell className="text-right">
                          <div className="flex flex-row gap-2 items-center justify-end">
                            <RiDeleteBinLine
                              className="size-6  cursor-pointer text-red-500"
                              onClick={() => handleDelete(cat.id)}
                            />
                          </div>
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

export default AdminCategories;
