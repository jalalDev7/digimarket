import React from "react";
import AdminMaxWidthWrapper from "./AdminMaxWidthWrapper";
import { IoMdAddCircleOutline } from "react-icons/io";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { trpc } from "@/app/_trpc/client";
import { RiDeleteBinLine } from "react-icons/ri";
import { LuLoader2 } from "react-icons/lu";
import AdminNewSliderDialog from "./AdminNewSliderDialog";
import { toast } from "@/hooks/use-toast";

const AdminSliders = () => {
  const utils = trpc.useUtils();
  const { data: sliders, isLoading } = trpc.getSliders.useQuery();
  const { mutate: deleteSlider } = trpc.deleteSlider.useMutation({
    onSuccess: () => {
      utils.getSliders.invalidate();

      return toast({
        title: "Slider deleted.",
        description: "The slider has been deleted.",
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
    deleteSlider({ id: id });
  };
  return (
    <AdminMaxWidthWrapper>
      <div className="flex flex-col w-full text-primary-foreground items-center justify-center">
        <div className="flex flex-row gap-2 w-full items-start justify-between">
          <div className="flex flex-col w-full bg-card-foreground border border-primary-foreground rounded-lg p-4">
            <div className="flex flex-row w-full items-start justify-between">
              <div className="flex flex-col w-full">
                <h2 className="text-primary-foreground font-bold">
                  Sliders list
                </h2>
                <h2 className="text-muted-foreground font-normal mb-4">
                  Browse all sliders
                </h2>
              </div>
              <AdminNewSliderDialog>
                <div className="flex flex-row gap-1 bg-card text-primary cursor-pointer rounded-lg p-2 items-center justify-center text-nowrap font-medium">
                  <IoMdAddCircleOutline className="size-6" />
                  Create new slider
                </div>
              </AdminNewSliderDialog>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-full">Title</TableHead>
                  <TableHead className="text-right min-w-[100px]">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sliders
                  ? sliders.map((slider) => (
                      <TableRow key={slider.id}>
                        <TableCell className="font-medium">
                          {slider.title}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex flex-row gap-2 items-center justify-end">
                            <RiDeleteBinLine
                              className="size-6  cursor-pointer"
                              onClick={() => handleDelete(slider.id)}
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

export default AdminSliders;
