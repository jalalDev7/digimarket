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
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { trpc } from "@/app/_trpc/client";
import { toast } from "@/hooks/use-toast";

const AdminNewProductDialog = (props: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const utils = trpc.useUtils();
  const { data: categories } = trpc.getCatgories.useQuery();
  const { mutate: createProduct } = trpc.createProduct.useMutation({
    onSuccess: () => {
      form.reset();
      setIsOpen(false);
      utils.getAdminProducts.invalidate();
      return toast({
        title: "Product created.",
        description: "The product has been created.",
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
    desc: z.string().optional(),
    image: z.string(),
    price: z.coerce.number(),
    state: z.boolean(),
    showcase: z.boolean(),
    category: z.string().optional(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      desc: "",
      image: "",
      price: 0,
      state: true,
      showcase: false,
      category: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    createProduct({
      title: values.title,
      category: values.category,
      desc: values.desc,
      image: values.image,
      price: values.price,
      showcase: values.showcase,
      state: values.state,
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
                          placeholder="Product title"
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
                name="desc"
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-2 w-full items-start justify-start ">
                    <div className="flex flex-col w-full relative">
                      <h4 className="absolute right-2 top-2 flex h-full items-start text-sm font-medium text-neutral-500">
                        Optional
                      </h4>
                      <FormLabel className="p-2">Description :</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Product description"
                          {...field}
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
                      <FormLabel className="p-2">Image link :</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Product image"
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
                name="price"
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-2 w-full items-start justify-start ">
                    <div className="flex flex-col w-full relative">
                      <h4 className="absolute right-2 top-2 flex h-full items-start text-sm font-medium text-neutral-500">
                        Obligatory
                      </h4>
                      <FormLabel className="p-2">Price :</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Product price"
                          type="number"
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
                name="category"
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-2 w-full items-start justify-start ">
                    <div className="flex flex-col w-full relative">
                      <FormLabel className="p-2">Category :</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          {...field}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories
                              ? categories.map((cat) => (
                                  <SelectItem key={cat.id} value={cat.id}>
                                    {cat.title}
                                  </SelectItem>
                                ))
                              : null}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <div className="flex flex-row items-center justify-between w-full mb-4">
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem className="flex flex-row gap-2 w-full items-start justify-start ">
                      <div className="flex flex-row items-center space-x-3">
                        <FormLabel className="p-2">Show product :</FormLabel>
                        <FormControl>
                          <Checkbox
                            id="state"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="showcase"
                  render={({ field }) => (
                    <FormItem className="flex flex-row gap-2 w-full items-start justify-start ">
                      <div className="flex flex-row items-center space-x-">
                        <FormLabel className="p-2">
                          Show in home page :
                        </FormLabel>
                        <FormControl>
                          <Checkbox
                            id="showcase"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <button
                type="submit"
                className="flex px-4 py-2 font-semibold text-lg bg-card text-primary items-center justify-center rounded-lg"
              >
                Create product
              </button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default AdminNewProductDialog;
