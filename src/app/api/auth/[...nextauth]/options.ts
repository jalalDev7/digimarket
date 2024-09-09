import { comparePassword, hashPassword } from "@/constants/functions";
import { db } from "@/db";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export const options: NextAuthOptions = {
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
        const firstCheck = await db.admin.findMany();
        if (!firstCheck || firstCheck.length === 0) {
          const hashPass = await hashPassword("123456");
          const createFirstAdmin = await db.admin.create({
            data: {
              username: "admin",
              password: hashPass,
              email: "admin@admin.com",
            },
          });
          if (!createFirstAdmin) return null;
        }

        if (!credentials || !credentials.username || !credentials.password)
          return null;

        const checkAdmin = await db.admin.findUnique({
          where: {
            username: credentials.username,
          },
        });
        if (!checkAdmin) return null;

        const checkPass = await comparePassword(
          credentials.password,
          checkAdmin.password
        );

        if (checkPass === true) {
          const user = {
            id: checkAdmin.id,
            name: checkAdmin.username,
            email: checkAdmin.email,
          };

          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};
