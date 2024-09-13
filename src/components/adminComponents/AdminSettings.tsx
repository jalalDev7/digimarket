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
import AdminMaxWidthWrapper from "./AdminMaxWidthWrapper";
const AdminSettings = () => {
  const { mutate: update } = trpc.updatePassword.useMutation({
    onSuccess: () => {
      form.reset();

      return toast({
        title: "Password updated.",
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
    password: z
      .string()
      .min(6, "Password must contain at least 6 caracters.")
      .max(15, "Max 15 caracters."),
    passwordConfirm: z
      .string()
      .min(6, "Password must contain at least 6 caracters.")
      .max(15, "Max 15 caracters."),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.password !== values.passwordConfirm) {
      return toast({
        title: "Operation failed",
        description: "Password confirmation failed.",
        variant: "destructive",
      });
    } else {
      update({ password: values.password });
    }
  }

  return (
    <AdminMaxWidthWrapper>
      <div className="flex mt-4 bg-card rounded-xl p-8 w-[50%]">
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
              name="password"
              render={({ field }) => (
                <FormItem className="flex flex-row gap-2 w-full items-start justify-start ">
                  <div className="flex flex-col w-full relative">
                    <h4 className="absolute right-2 top-2 flex h-full items-start text-sm font-medium text-neutral-500">
                      Obligatory
                    </h4>
                    <FormLabel className="p-2 text-primary">
                      New password :
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="New password"
                        type="password"
                        {...field}
                        width="100%"
                        className="text-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem className="flex flex-row gap-2 w-full items-start justify-start ">
                  <div className="flex flex-col w-full relative">
                    <h4 className="absolute right-2 top-2 flex h-full items-start text-sm font-medium text-neutral-500">
                      Obligatory
                    </h4>
                    <FormLabel className="p-2 text-primary">
                      Confirm password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm password"
                        {...field}
                        width="100%"
                        className="text-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <button
              type="submit"
              className="flex px-4 py-2 font-semibold text-lg bg-primary text-primary-foreground items-center justify-center rounded-lg"
            >
              Update password
            </button>
          </form>
        </Form>
      </div>
    </AdminMaxWidthWrapper>
  );
};

export default AdminSettings;
