import { TRPCError } from "@trpc/server";
import { adminProcedure, publicProcedure, router } from "./trpc";
import { z } from "zod";
import { db } from "@/db";
import { hashPassword } from "@/constants/functions";
import Jwt from "jsonwebtoken";

export const appRouter = router({
  createNewAdmin: adminProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
        confirmPassword: z.string(),
        email: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (!ctx.user) throw new TRPCError({ code: "UNAUTHORIZED" });
      if (
        !input.username ||
        !input.password ||
        !input.confirmPassword ||
        !input.email
      )
        throw new TRPCError({ code: "BAD_REQUEST" });

      if (input.password !== input.confirmPassword)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Password confirmation failed",
        });
      const encryptPass = hashPassword(input.password);

      const getOldAdmins = await db.admin.findMany();
      if (!getOldAdmins) throw new TRPCError({ code: "BAD_REQUEST" });
      if (getOldAdmins.length > 0) {
        if (getOldAdmins.find((admin) => admin.username === input.username))
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Username already exist",
          });
        if (getOldAdmins.find((admin) => admin.email === input.email))
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Email already exist",
          });

        const createNew = await db.admin.create({
          data: {
            username: input.username,
            email: input.email,
            password: encryptPass,
          },
        });
        if (!createNew) throw new TRPCError({ code: "BAD_REQUEST" });
      } else {
        const createNew = await db.admin.create({
          data: {
            username: input.username,
            email: input.email,
            password: encryptPass,
          },
        });
        if (!createNew) throw new TRPCError({ code: "BAD_REQUEST" });
      }
    }),
  adminLogin: publicProcedure
    .input(z.object({ username: z.string(), password: z.string() }))
    .mutation(async ({ input }) => {
      console.log(1);
      if (!input.username || !input.password)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Username or password is empty",
        });
      const hashedPassword = hashPassword(input.password);

      const checkAdmin = await db.admin.findFirst({
        where: { username: input.username, password: hashedPassword },
      });
      if (!checkAdmin)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Username or password is incorrect",
        });
      const token = Jwt.sign(
        {
          data: checkAdmin.id,
        },
        "admin",
        { expiresIn: "1h" }
      );
      console.log(token);

      return { data: token };
    }),
});

export type AppRouter = typeof appRouter;
