import { z } from "zod";
import { adminProcedure, router } from "./trpc";
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
      },
    });
    if (!getProducts) throw new TRPCError({ code: "BAD_REQUEST" });
    return getProducts;
  }),
});

export type AppRouter = typeof appRouter;
