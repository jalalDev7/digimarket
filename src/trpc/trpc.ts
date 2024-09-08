import { initTRPC, TRPCError } from "@trpc/server";
import { createContext } from "./context";

const t = initTRPC.context<typeof createContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const adminProcedure = publicProcedure.use(async (opts) => {
  const { ctx } = opts;
  if (!ctx.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return opts.next({
    ctx: {
      user: ctx.userId,
    },
  });
});
