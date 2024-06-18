import "~/styles/globals.css";
import '@radix-ui/themes/styles.css';

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "~/trpc/react";
import Header from "~/app/_components/header";
import { getServerSession } from "~/server/getServerSession";

export const metadata = {
  title: "DevSeek",
  description: "The sneaker development directory.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="bg-black bg-opacity-90">
        <TRPCReactProvider>
          <div>
            <Header session={session} />
            {children}
          </div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
