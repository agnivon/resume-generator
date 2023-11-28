import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";

import { Routes } from "@/constants/routes.constants";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "../../../../clients/mongoClient";

const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
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
    // ...add more providers here
  ],
  callbacks: {},
  pages: {
    signIn: Routes.SIGNIN,
    signOut: Routes.SIGNOUT,
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };