import { isPathProtected, PATH_SIGN_IN } from "@/config/path";
import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const KEY_CALLBACK_URL = "callbackUrl";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async ({ email, password }) => {
        if (
          process.env.ADMIN_EMAIL &&
          process.env.ADMIN_EMAIL === email &&
          process.env.ADMIN_PASSWORD &&
          process.env.ADMIN_PASSWORD === password
        ) {
          const user: User = { email, name: "Admin User" };
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl;

      const isUrlProtected = isPathProtected(pathname);
      const isUserLoggedIn = !!auth?.user;
      const isRequestAuthorized = !isUrlProtected || isUserLoggedIn;

      return isRequestAuthorized;
    },
  },
  pages: {
    signIn: PATH_SIGN_IN,
  },
});
