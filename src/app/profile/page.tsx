"use server";

import Link from "next/link";
import { signIn } from "next-auth/react";
import {
  Card,
  CardHeader,
  CardDescription,
  CardFooter,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "~/components/ui/tabs";
import ConnectGithub from "~/app/_components/connect-github";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Home() {
  const session = await getServerAuthSession();
  console.log(session.user);
  return (
    <main className="relative z-0 flex flex-col items-center py-4 text-white">
      <div className="container flex flex-col items-center justify-center px-4 py-16">
        <div className="flex w-full justify-center">
          <div className="relative w-full lg:w-2/3">
            <Tabs defaultValue="profile" className="min-w-full">
              <TabsList className="absolute -top-8 left-4 z-50 m-0 flex space-x-4 bg-transparent">
                <TabsTrigger
                  className="w-1/2 rounded-b-none rounded-t-sm bg-zinc-800/40 px-5 py-2 text-zinc-300 ring-0 data-[state=active]:bg-zinc-800 data-[state=active]:text-white data-[state=active]:shadow-none"
                  value="profile"
                >
                  Profile
                </TabsTrigger>
                <TabsTrigger
                  className="w-1/2 rounded-b-none rounded-t-sm bg-zinc-800/40 px-5 py-2 text-zinc-300 ring-0 data-[state=active]:bg-zinc-800 data-[state=active]:text-white data-[state=active]:shadow-none"
                  value="activity"
                >
                  Activity
                </TabsTrigger>
              </TabsList>
              <Card className="lg:min-w-2/3 z-10 -mt-0.5 h-96 min-w-full border-none bg-zinc-800 p-0 text-white">
                <TabsContent className="min-w-full p-4" value="profile">
                  <CardHeader>
                    <h1 className="text-2xl font-semibold">
                      {session.user.name}
                    </h1>
                    <h4 className="text-sm text-gray-500">Software Engineer</h4>
                  </CardHeader>
                  <CardDescription className="min-w-full px-6 pb-6 text-gray-300">
                    John is a passionate software engineer with over 10 years of
                    experience in full-stack development. He loves coding,
                    teaching, and contributing to open source projects. John is
                    a passionate software engineer with over 10 years of
                    experience in full-stack development. He loves coding,
                    teaching, and contributing to open source projects.
                  </CardDescription>
                  <CardFooter className="flex space-x-2">
                    <ConnectGithub />
                    <Button color="secondary">Connect on LinkedIn</Button>
                  </CardFooter>
                </TabsContent>
                <TabsContent className="min-w-full p-4" value="activity">
                  <CardHeader>
                    <h1 className="text-2xl font-semibold">
                      {session.user.name}
                    </h1>
                    <h4 className="text-sm text-gray-500">Software Engineer</h4>
                  </CardHeader>
                  <CardDescription className="min-w-full px-6 pb-6 text-gray-300">
                    John is a passionate software engineer with over 10 years of
                    experience in full-stack development. He loves coding,
                    teaching, and contributing to open source projects. John is
                    a passionate software engineer with over 10 years of
                    experience in full-stack development. He loves coding,
                    teaching, and contributing to open source projects.
                  </CardDescription>
                  <CardFooter className="flex space-x-2">
                    <ConnectGithub />
                    <Button color="secondary">Connect on LinkedIn</Button>
                  </CardFooter>
                </TabsContent>
              </Card>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  );
}
