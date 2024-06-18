import { PrismaAdapter } from "@auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import DiscordProvider from "next-auth/providers/discord";
import GitHubProvider from "next-auth/providers/github";

import { env } from "~/env";
import { db } from "~/server/db";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      discordId?: string; // Adding Discord ID to the session
      githubId?: number; // Adding GitHub ID to the session
      githubUrl?: string; // Adding GitHub URL to the session
      // Add other properties you want to attach
    } & DefaultSession["user"];
  }

  interface User {
    discordId?: string; // Add Discord ID to the User type
    githubUrl?: string; // Add GitHub URL to the User type
    githubId?: number; // Add GitHub ID to the User type
    // Add other properties you want to attach
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: async ({ session, user }) => {
      const userInDb = await db.user.findUnique({ where: { id: user.id } });
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          githubId: userInDb?.githubId,
          discordId: userInDb?.discordId,
          githubUrl: userInDb?.githubUrl,
        },
      };
    },
  },
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions);
