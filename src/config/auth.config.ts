import prisma from "@/clients/prismaClient";
import { Routes } from "@/constants/routes.constants";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    /* EmailProvider({
        server: {
          host: process.env.EMAIL_SERVER_HOST,
          port: process.env.EMAIL_SERVER_PORT,
          auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD
          }
        },
        from: process.env.EMAIL_FROM
      }), */
    // ...add more providers here
  ],
  callbacks: {
    /*  async signIn({ user }) {
        if (user.email) {
          return true;
        } else {
          return "/auth/error?error=Email not accessible";
        }
      }, */
    session: async ({ session, token }) => {
      //console.log("token in session callback", token);
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      //console.log("session in session callback", session);
      return session;
    },
    /* jwt: async ({ account, token }) => {
        console.log("account in jwt callback", account);
        if (account) {
          token.userId = account.userId;
        }
        console.log("token in jwt callback", token);
        return token;
      }, */
  },
  pages: {
    signIn: Routes.SIGNIN,
    signOut: Routes.SIGNOUT,
    error: Routes.ERROR,
  },
};
