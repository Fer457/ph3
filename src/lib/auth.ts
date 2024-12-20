/* eslint-disable @typescript-eslint/ban-ts-comment */
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import type { NextAuthOptions } from "next-auth";
import credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    credentials({
      name: "Credentials",
      id: "credentials",
      credentials: {
        name: { label: "Name", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({
          name: credentials?.name,
        }).select("+password");

        if (!user) throw new Error("Wrong name");

        const passwordMatch = await bcrypt.compare(
          credentials!.password,
          user.password,
        );

        console.log(user);

        if (!passwordMatch) throw new Error("Wrong Password");
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        //@ts-expect-error
        token.hasVoted = user.hasVoted;
      }
      return token;
    },
    async session({ session, token }) {
      //@ts-expect-error
      session.user.id = token.id;
      //@ts-expect-error
      session.user.hasVoted = token.hasVoted;

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};
