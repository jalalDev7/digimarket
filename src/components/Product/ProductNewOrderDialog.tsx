"use client";
import React, { ReactNode, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "../ui/form";
import { Input } from "../ui/input";
import { trpc } from "@/app/_trpc/client";
import { toast } from "@/hooks/use-toast";

const ProductNewOrderDialog = (props: {
  children: ReactNode;
  productId: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const utils = trpc.useUtils();
  const { mutate: createOrder } = trpc.createOrder.useMutation({
    onSuccess: () => {
      form.reset();
      setIsOpen(false);
      utils.getOrders.invalidate();
      return toast({
        title: "Order created.",
        description:
          "The order has been created. We will contact you within 24H.",
        variant: "success",
      });
    },
    onError: () => {
      return toast({
        title: "Operation failed",
        description: "Please check all obligatory fields",
        variant: "destructive",
      });
    },
  });

  const formSchema = z.object({
    name: z.string(),
    phone: z.string(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    createOrder({
      name: values.name,
      phone: values.phone,
      productId: props.productId,
    });
  }
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        !v ? setIsOpen(v) : null;
      }}
    >
      <DialogTrigger onClick={() => setIsOpen(true)} asChild>
        {props.children}
      </DialogTrigger>
      <DialogContent className="gap-0 bg-card-foreground" autoFocus={false}>
        <h2 className="font-semibold">Create new order</h2>
        <h2 className="font-normal text-muted-foreground text-sm">
          Please fill the form bellow
        </h2>
        <div className="flex mt-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              onChange={() => {
                form.reset;
              }}
              className="flex flex-col w-full space-y-2"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-2 w-full items-start justify-start ">
                    <div className="flex flex-col w-full relative">
                      <h4 className="absolute right-2 top-2 flex h-full items-start text-sm font-medium text-neutral-500">
                        Obligatory
                      </h4>
                      <FormLabel className="p-2">Your name :</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your name"
                          {...field}
                          width="100%"
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-2 w-full items-start justify-start ">
                    <div className="flex flex-col w-full relative">
                      <h4 className="absolute right-2 top-2 flex h-full items-start text-sm font-medium text-neutral-500">
                        Obligatory
                      </h4>
                      <FormLabel className="p-2">Phone number :</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your phone number"
                          {...field}
                          width="100%"
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <button
                type="submit"
                className="flex px-4 py-2 font-semibold text-lg bg-card text-primary items-center justify-center rounded-lg"
              >
                Buy now
              </button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductNewOrderDialog;
