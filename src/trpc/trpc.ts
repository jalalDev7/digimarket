import { initTRPC, TRPCError } from "@trpc/server";
import { getServerSession } from "next-auth";
import { Context } from "./context";

const t = initTRPC.context<Context>().create();
const middleware = t.middleware;

const isAuth = middleware(async (opts) => {
  const session = await getServerSession();

  if (!session || !session.user) throw new TRPCError({ code: "UNAUTHORIZED" });
  const user = session.user;

  return opts.next({
    ctx: {
      user,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const adminProcedure = t.procedure.use(isAuth);
