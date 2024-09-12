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

const AdminNewSliderDialog = (props: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const utils = trpc.useUtils();
  const { mutate: createSlider } = trpc.createSlider.useMutation({
    onSuccess: () => {
      form.reset();
      setIsOpen(false);
      utils.getSliders.invalidate();
      return toast({
        title: "Category created.",
        description: "The category has been created.",
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
    title: z
      .string()
      .min(5, "Please fille the title, at least 5 caracters.")
      .max(30, "Title limit 30 caracters."),
    image: z.string(),
    link: z.string(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      image: "",
      link: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    createSlider({
      title: values.title,
      image: values.image,
      link: values.link,
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
        <h2 className="font-semibold">Create new product</h2>
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
                name="title"
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-2 w-full items-start justify-start ">
                    <div className="flex flex-col w-full relative">
                      <h4 className="absolute right-2 top-2 flex h-full items-start text-sm font-medium text-neutral-500">
                        Obligatory
                      </h4>
                      <FormLabel className="p-2">Title :</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Slider title"
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
                name="image"
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-2 w-full items-start justify-start ">
                    <div className="flex flex-col w-full relative">
                      <h4 className="absolute right-2 top-2 flex h-full items-start text-sm font-medium text-neutral-500">
                        Obligatory
                      </h4>
                      <FormLabel className="p-2">
                        Image link : 1920*600px
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Slider image link"
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
                name="link"
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-2 w-full items-start justify-start ">
                    <div className="flex flex-col w-full relative">
                      <h4 className="absolute right-2 top-2 flex h-full items-start text-sm font-medium text-neutral-500">
                        Obligatory
                      </h4>
                      <FormLabel className="p-2">Slider link :</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Slider link"
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
                Create slider
              </button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminNewSliderDialog;
