import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import clientPromise from "./mongoClient";

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
  callbacks: {
    async jwt({ token, user, account, profile }) {
      //console.log("jwt callback", user, account, profile);
      if (user?.email) {
        token.userId = user.email;
      }
      //console.log("token after adding userId", token);
      return token;
    },
    async session({ session, token, user }) {
      const client = await clientPromise;
      const userMembershipColl = client.db().collection("user-memberships");
      let userMembership;
      //console.log("session callback", token, user);
      if (token?.userId || user?.email) {
        const userId = user?.email || (token.userId as string);
        userMembership = await userMembershipColl.findOne({ userId });
        if (!userMembership) {
          userMembership = await userMembershipColl.insertOne({
            userId,
            premium: false,
          });
        }
        (session.user as any)["membership"] = userMembership;
        return session;
      }
      return session;
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
