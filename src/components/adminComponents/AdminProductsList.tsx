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
import { IoMdAddCircleOutline } from "react-icons/io";
import AdminNewProductDialog from "./AdminNewProductDialog";
import { trpc } from "@/app/_trpc/client";
import { LuClipboardEdit, LuLoader2 } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import { toast } from "@/hooks/use-toast";
import AdminProductEditDialog from "./AdminProductEditDialog";
import { productType } from "@/types/types";

const AdminProductsList = () => {
  const utils = trpc.useUtils();
  const [editState, setEditState] = useState(false);
  const [productOnEdit, setProductOnEdit] = useState<productType | undefined>();
  const { data: products, isLoading } = trpc.getAdminProducts.useQuery();
  const { mutate: deleteProduct } = trpc.deleteProduct.useMutation({
    onSuccess: () => {
      utils.getAdminProducts.invalidate();
      return toast({
        title: "Product deleted.",
        description: "The product has been deleted.",
        variant: "success",
      });
    },
    onError: () => {
      return toast({
        title: "Operation failed.",
        description: "Please refresh the page and rerty.",
        variant: "destructive",
      });
    },
  });

  const handleDelete = (id: string) => {
    deleteProduct({ id: id });
  };
  const handleEdit = (product: productType) => {
    setProductOnEdit(product);
    setEditState(true);
  };
  return (
    <AdminMaxWidthWrapper>
      {editState && productOnEdit ? (
        <AdminProductEditDialog
          dialogState={editState}
          product={productOnEdit}
          setEditState={setEditState}
          setProductOnEdit={setProductOnEdit}
        />
      ) : null}
      <div className="flex flex-col w-full text-primary-foreground items-center justify-center">
        <div className="flex flex-row gap-2 w-full items-start justify-between">
          <div className="flex flex-col w-full bg-card-foreground border border-primary-foreground rounded-lg p-4">
            <div className="flex flex-row w-full items-start justify-between">
              <div className="flex flex-col w-full">
                <h2 className="text-primary-foreground font-bold">
                  Product list
                </h2>
                <h2 className="text-muted-foreground font-normal mb-4">
                  Browse all products
                </h2>
              </div>
              <div className="flex flex-row gap-2">
                <AdminNewProductDialog>
                  <div className="flex bg-card text-primary cursor-pointer rounded-lg px-2 items-center justify-center">
                    <IoMdAddCircleOutline className="size-6" />
                  </div>
                </AdminNewProductDialog>

                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filtre by state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>States</SelectLabel>
                      <SelectItem value="actif">Actif products</SelectItem>
                      <SelectItem value="hidden">Hidden products</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-full">Product title</TableHead>
                  <TableHead className="text-nowrap min-w-[100px] text-center">
                    Price
                  </TableHead>
                  <TableHead className="text-nowrap min-w-[100px] text-center">
                    Statut
                  </TableHead>
                  <TableHead className="text-nowrap min-w-[100px] text-center">
                    Show in home page
                  </TableHead>
                  <TableHead className="text-nowrap min-w-[100px] text-center">
                    Total orders
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products
                  ? products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">
                          {product.title}
                        </TableCell>
                        <TableCell className="text-center">
                          {product.price}
                        </TableCell>
                        <TableCell className="text-center">
                          {product.state ? "actif" : "hidden"}
                        </TableCell>
                        <TableCell className="text-center">
                          {product.showcase ? "Yes" : "No"}
                        </TableCell>
                        <TableCell className="text-center">
                          {product._count.orders}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex flex-row gap-2 items-center justify-end">
                            <LuClipboardEdit
                              className="size-6  cursor-pointer"
                              onClick={() => handleEdit(product)}
                            />
                            <RiDeleteBinLine
                              className="size-6  cursor-pointer"
                              onClick={() => handleDelete(product.id)}
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

export default AdminProductsList;
