import { NextApiHandler } from "next";
import NextAuth, { Account, Profile, Session, User } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { PrismaClient } from "@prisma/client";
import { AdapterUser } from "next-auth/adapters";
import { uniqueNamesGenerator, colors, animals } from "unique-names-generator";
import { CredentialInput } from "next-auth/providers";

// avoids too many connections during local development
let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

const options = {
  providers: [
    // EmailProvider({
    //   server: process.env.EMAIL_SERVER,
    //   from: process.env.EMAIL_FROM
    // }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    session: async ({
      session,
      user,
    }: {
      session: Session;
      user: User | AdapterUser;
    }) => {
      const activeuser = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      let username: string = "";
      if (!activeuser.username) {
        do {
          username = uniqueNamesGenerator({
            dictionaries: [colors, animals],
          });
        } while (await prisma.user.findUnique({ where: { username } }));

        await prisma.user.update({
          where: { email: user.email },
          data: { username },
        });
      }

      session.user.username = username || activeuser.username;
      session.user.admin = activeuser.admin;

      return session;
    },
    signIn: async ({
      user,
      account,
      profile,
    }: {
      user: User | AdapterUser;
      account: Account;
      profile?: Profile;
      email?: { verificationRequest?: boolean };
      credentials?: Record<string, CredentialInput>;
    }) => {
      /*
      Add logic here if we need to check if a user 
      can sign in or not.
      ---
      If can sign in then return true, 
      otherwise return false
      */

      return true;
    },
  },
};

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);

export default authHandler;
