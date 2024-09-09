"use client";
import React, { ReactNode, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { z } from "zod";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const AdminNewProductDialog = (props: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const formSchema = z.object({
    title: z
      .string()
      .min(5, "Please fille the title, at least 5 caracters.")
      .max(30, "Title limit 30 caracters."),
    desc: z.string().optional(),
    price: z.coerce.number(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      desc: "",
      price: 0,
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {}

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
        <h2 className="font-semibold">Create new product</h2>
        <h2 className="font-normal text-muted-foreground text-sm">
          Please fill the form bellow
        </h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            onChange={() => {
              form.reset;
            }}
            className="flex flex-col w-full "
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex flex-row gap-2 w-full items-start justify-start ">
                  <div className="flex flex-col w-full relative">
                    <h4 className="absolute right-2 top-2 flex h-full items-start text-sm font-medium text-neutral-500">
                      Obligatory
                    </h4>
                    <FormLabel className="p-2">Title :</FormLabel>
                    <FormControl>
                      <Input placeholder="Link title" {...field} width="100%" />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default AdminNewProductDialog;
