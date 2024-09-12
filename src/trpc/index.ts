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
  getProductData: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      if (!input.id) throw new TRPCError({ code: "BAD_REQUEST" });
      const getProduct = await db.products.findFirst({
        where: {
          id: input.id,
          state: true,
        },
        include: {
          _count: {
            select: {
              orders: true,
            },
          },
          categories: {
            select: {
              title: true,
            },
          },
        },
      });
      if (!getProduct) throw new TRPCError({ code: "BAD_REQUEST" });
      return getProduct;
    }),
  getProductByCat: publicProcedure
    .input(z.object({ catId: z.string() }))
    .query(async ({ input }) => {
      if (!input.catId) throw new TRPCError({ code: "BAD_REQUEST" });
      const getProducts = await db.products.findMany({
        where: {
          state: true,
          catId: input.catId,
        },
        include: {
          categories: {
            select: {
              title: true,
            },
          },
        },
      });
      if (!getProducts) throw new TRPCError({ code: "BAD_REQUEST" });
      return getProducts;
    }),
  getSliders: publicProcedure.query(async () => {
    const getSliders = await db.sliders.findMany();
    if (!getSliders) throw new TRPCError({ code: "BAD_REQUEST" });
    return getSliders;
  }),
  deleteSlider: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) throw new TRPCError({ code: "UNAUTHORIZED" });
      if (!input.id) throw new TRPCError({ code: "BAD_REQUEST" });
      const deleteSlider = await db.sliders.delete({
        where: {
          id: input.id,
        },
      });
      if (!deleteSlider) throw new TRPCError({ code: "BAD_REQUEST" });
      return { success: true };
    }),
  createSlider: adminProcedure
    .input(z.object({ title: z.string(), image: z.string(), link: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) throw new TRPCError({ code: "UNAUTHORIZED" });
      if (!input.title || !input.image || !input.link)
        throw new TRPCError({ code: "BAD_REQUEST" });
      const createNewSlider = await db.sliders.create({
        data: {
          title: input.title,
          link: input.link,
          imageLink: input.image,
        },
      });
      if (!createNewSlider) throw new TRPCError({ code: "BAD_REQUEST" });
      return { success: true };
    }),
  createOrder: publicProcedure
    .input(
      z.object({ productId: z.string(), name: z.string(), phone: z.string() })
    )
    .mutation(async ({ input }) => {
      if (!input.name || !input.productId || !input.phone)
        throw new TRPCError({ code: "BAD_REQUEST" });
      const createOrder = await db.orders.create({
        data: {
          clientName: input.name,
          clientPhone: input.phone,
          productId: input.productId,
          clientAdress: "null",
        },
      });
      if (!createOrder) throw new TRPCError({ code: "BAD_REQUEST" });
      return { success: true };
    }),
  getOrders: adminProcedure
    .input(z.object({ filtre: z.string() }))
    .query(async ({ ctx, input }) => {
      if (!ctx.user) throw new TRPCError({ code: "UNAUTHORIZED" });
      if (input.filtre === "new") {
        const getOrders = await db.orders.findMany({
          where: {
            state: "new",
          },
          include: {
            products: true,
          },
        });
        if (!getOrders) throw new TRPCError({ code: "BAD_REQUEST" });
        return getOrders;
      } else if (input.filtre === "confirmed") {
        const getOrders = await db.orders.findMany({
          where: {
            state: "confirmed",
          },
          include: {
            products: true,
          },
        });
        if (!getOrders) throw new TRPCError({ code: "BAD_REQUEST" });
        return getOrders;
      } else if (input.filtre === "canceled") {
        const getOrders = await db.orders.findMany({
          where: {
            state: "canceled",
          },
          include: {
            products: true,
          },
        });
        if (!getOrders) throw new TRPCError({ code: "BAD_REQUEST" });
        return getOrders;
      } else {
        const getOrders = await db.orders.findMany({
          include: {
            products: true,
          },
        });
        if (!getOrders) throw new TRPCError({ code: "BAD_REQUEST" });
        return getOrders;
      }
    }),
  updateOrder: adminProcedure
    .input(z.object({ id: z.string(), newState: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) throw new TRPCError({ code: "UNAUTHORIZED" });
      if (!input.id || !input.newState)
        throw new TRPCError({ code: "BAD_REQUEST" });
      const update = await db.orders.update({
        where: {
          id: input.id,
        },
        data: {
          state: input.newState,
        },
      });
      if (!update) throw new TRPCError({ code: "BAD_REQUEST" });
      return { success: true };
    }),
});

export type AppRouter = typeof appRouter;
