export async function createContext(req: Request) {
  // Create your context based on the request object
  // Will be available as `ctx` in all your resolvers
  // This is just an example of something you might want to do in your ctx fn

  const clientIp = req.headers.get("x-forwarded-for");

  return {
    clientIp,
  };
}
export type Context = Awaited<ReturnType<typeof createContext>>;
