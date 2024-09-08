import { db } from "@/db";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        if (!credentials || credentials.username || credentials.password)
          return null;
        const getUser = await db.admin.findFirst({
          where: {
            username: credentials.username,
            password: credentials.password,
          },
        });
        if (!getUser) return null;

        return getUser;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
