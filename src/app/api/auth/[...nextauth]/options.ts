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
        const fakeUser = {
          id: "1",
          username: "admin",
          password: "123456",
          email: "jalal@jalal.com",
          name: "jalal",
        };
        if (!credentials || !credentials.username || !credentials.password)
          return null;
        if (
          credentials.username !== fakeUser.username ||
          credentials.password !== fakeUser.password
        ) {
          return null;
        } else {
          return fakeUser;
        }
      },
    }),
  ],
};
