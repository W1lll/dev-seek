import Link from "next/link";

import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import Footer from "~/app/_components/footer";

export default async function Home() {

  const postCount = (await getPosts()).length;
  const userCount = (await getUsers()).length;

  return (
    <main className="flex flex-col items-center py-4 text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
      </div>
      <div className="fixed bottom-0 w-full">
        <Footer postCount={postCount} userCount={userCount} />
      </div>
    </main>
  );
}

async function getPosts() {
  return await api.post.get();
}

async function getUsers() {
  return await api.user.get();
}
