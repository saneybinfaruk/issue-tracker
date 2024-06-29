import prisma from "@/prisma/PrismaClient";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOption: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", placeholder: "Email...", type: "text" },
        password: {
          label: "Password",
          placeholder: "Password...",
          type: "password",
        },
      },

      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) throw new Error("Invalid email or password");

        const passwordMatched = await bcrypt.compare(
          credentials.password,
          user.password!
        );

        if (!passwordMatched) throw new Error("Invalid email or password");

        return user;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_KEY!,
      clientSecret: process.env.GOOGLE_SECRET_KEY!,
      allowDangerousEmailAccountLinking: true,
    }),

    GithubProvider({
      clientId: process.env.GITGUB_CLIENT_KEY!,
      clientSecret: process.env.GITGUB_SECRET_KEY!,
      allowDangerousEmailAccountLinking: true,
    }),
  ],

  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },

  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user) return "No user found";

      return true;
    },
  },
};