import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import client from "./lib/db";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: MongoDBAdapter(client),
  providers: [Google],
});
