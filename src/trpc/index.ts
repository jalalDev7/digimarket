import { z } from "zod";
import { adminProcedure, publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/db";

export const appRouter = router({
  createProduct: adminProcedure
    .input(
      z.object({
        title: z.string(),
        desc: z.string().optional(),
        image: z.string(),
        price: z.number(),
        state: z.boolean(),
        showcase: z.boolean(),
        category: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) throw new TRPCError({ code: "UNAUTHORIZED" });
      if (!input.title || !input.price || !input.image)
        throw new TRPCError({ code: "BAD_REQUEST" });

      const createNewProduct = await db.products.create({
        data: {
          title: input.title,
          desc: input.desc,
          imageLink: input.image,
          price: input.price,
          state: input.state,
          showcase: input.showcase,
          catId: input.category,
        },
      });

      if (!createNewProduct) throw new TRPCError({ code: "BAD_REQUEST" });
      return { succes: true };
    }),
  getAdminProducts: adminProcedure.query(async ({ ctx }) => {
    if (!ctx.user) throw new TRPCError({ code: "UNAUTHORIZED" });
    const getProducts = await db.products.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        _count: {
          select: {
            orders: true,
          },
        },
        categories: true,
      },
    });
    if (!getProducts) throw new TRPCError({ code: "BAD_REQUEST" });
    return getProducts;
  }),
  deleteProduct: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) throw new TRPCError({ code: "UNAUTHORIZED" });
      if (!input.id) throw new TRPCError({ code: "BAD_REQUEST" });
      const deleteProduct = await db.products.delete({
        where: {
          id: input.id,
        },
        include: {
          orders: true,
        },
      });
      if (!deleteProduct) throw new TRPCError({ code: "BAD_REQUEST" });
      return { success: true };
    }),
  updateProducts: adminProcedure
    .input(
      z.object({
        title: z.string(),
        desc: z.string().optional(),
        image: z.string(),
        price: z.number(),
        state: z.boolean(),
        showcase: z.boolean(),
        category: z.string().optional(),
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) throw new TRPCError({ code: "UNAUTHORIZED" });
      if (!input.title || !input.price || !input.image || !input.id)
        throw new TRPCError({ code: "BAD_REQUEST" });

      const createNewProduct = await db.products.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          desc: input.desc,
          imageLink: input.image,
          price: input.price,
          state: input.state,
          showcase: input.showcase,
          catId: input.category,
        },
      });

      if (!createNewProduct) throw new TRPCError({ code: "BAD_REQUEST" });
      return { succes: true };
    }),
  getCatgories: publicProcedure.query(async () => {
    const getCats = await db.categories.findMany();
    if (!getCats) throw new TRPCError({ code: "BAD_REQUEST" });
    return getCats;
  }),
  createCategory: adminProcedure
    .input(
      z.object({
        title: z.string(),
        desc: z.string().optional(),

        state: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) throw new TRPCError({ code: "UNAUTHORIZED" });
      if (!input.title) throw new TRPCError({ code: "BAD_REQUEST" });

      const createNewCat = await db.categories.create({
        data: {
          title: input.title,
          desc: input.desc,
          state: input.state,
        },
      });

      if (!createNewCat) throw new TRPCError({ code: "BAD_REQUEST" });
      return { succes: true };
    }),
  deleteCategory: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) throw new TRPCError({ code: "UNAUTHORIZED" });
      if (!input.id) throw new TRPCError({ code: "BAD_REQUEST" });
      const getProductsCat = await db.products.updateMany({
        where: {
          catId: input.id,
        },
        data: {
          catId: null,
        },
      });
      if (!getProductsCat) throw new TRPCError({ code: "BAD_REQUEST" });
      const deleteProduct = await db.categories.delete({
        where: {
          id: input.id,
        },
      });
      if (!deleteProduct) throw new TRPCError({ code: "BAD_REQUEST" });
      return { success: true };
    }),
  getHomeProducts: publicProcedure
    .input(z.object({ cat: z.string().optional() }))
    .query(async ({ input }) => {
      const getProducts = await db.products.findMany({
        where: {
          catId: input.cat,
          showcase: true,
          state: true,
        },
      });
      if (!getProducts) throw new TRPCError({ code: "BAD_REQUEST" });
      return getProducts;
    }),
});

export type AppRouter = typeof appRouter;
