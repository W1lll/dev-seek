"use client";

import { signIn } from "next-auth/react";
import React from "react";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
  CloseButton,
  PopoverOverlay,
} from "@headlessui/react";
import {
  MenuIcon,
  XIcon,
  HomeIcon,
  InformationCircleIcon,
  MailIcon,
  UserIcon,
  LogoutIcon,
  CogIcon,
  ChatAltIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import Divider from "@mui/material/Divider";

import type { Session } from "~/types";

const routes = [
  {
    icon: HomeIcon,
    title: "Job Listings",
    url: "/posts",
    description: "All active job listings.",
  },
  {
    icon: InformationCircleIcon,
    title: "Developer Directory",
    url: "/about",
    description: "A collection of all registered developers.",
  },
  {
    icon: ChatAltIcon,
    title: "Contact",
    url: "/contact",
    description: "Get in touch with us.",
  },
];

const profileRoutes = [
  {
    icon: UserIcon,
    title: "Profile",
    url: "/profile",
  },
  {
    icon: MailIcon,
    title: "Inbox",
    url: "/",
  },
  {
    icon: CogIcon,
    title: "Settings",
    url: "/",
    divider: true,
  },
  {
    icon: LogoutIcon,
    title: "Sign Out",
    url: "/api/auth/signout",
  },
];

interface HeaderProps {
  session: Session | null; // Annotate the session prop
}

export default function Header({ session }: HeaderProps) {
  return (
    <header className="z-50 w-full">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-8">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link
              className="block bg-gradient-to-br from-green-300 via-green-500 to-green-300 bg-clip-text text-3xl font-extrabold text-transparent lg:text-3xl xl:inline"
              href="/"
            >
              DevSeek
            </Link>
          </div>
          <div className="flex items-center justify-center">
            <Popover className="relative mr-4">
              {({ open }) => (
                <>
                  <PopoverOverlay className="pointer-events-none fixed inset-0" />
                  <PopoverButton
                    className={clsx(
                      "inline-flex items-center justify-center rounded-md p-2 text-white focus:outline-none",
                      {
                        "hover:bg-white hover:bg-opacity-10": !open,
                        "bg-black/40": open,
                      },
                    )}
                  >
                    <span className="sr-only">Open main menu</span>
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{ rotate: open ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </motion.div>
                  </PopoverButton>
                  <AnimatePresence>
                    {open && (
                      <PopoverPanel
                        static
                        className="absolute right-0 z-50 mt-4 w-80 rounded-lg bg-black text-white shadow-xl"
                        as={motion.div}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        anchor="bottom end"
                      >
                        <div className="p-4">
                          {routes.map((route, index) => (
                            <CloseButton as={Link} key={index} href={route.url}>
                              <div
                                className={clsx(
                                  "flex items-center justify-start rounded-md px-4 py-4 transition-colors hover:bg-white/5",
                                  {
                                    "mb-2": index < routes.length - 1,
                                  },
                                )}
                              >
                                <route.icon className="h-8 min-w-8 text-white" />
                                <div className="ml-3">
                                  <div className="text-sm font-medium text-white">
                                    {route.title}
                                  </div>
                                  <div className="text-sm text-white/50">
                                    {route.description}
                                  </div>
                                </div>
                              </div>
                            </CloseButton>
                          ))}
                        </div>
                      </PopoverPanel>
                    )}
                  </AnimatePresence>
                </>
              )}
            </Popover>
            {session ? (
              <Popover className="relative">
                {({ open }) => (
                  <>
                    <PopoverOverlay className="pointer-events-none fixed inset-0" />
                    <PopoverButton className="flex items-center justify-center focus:outline-none">
                      <Image
                        src={session.user.image}
                        alt="Profile Picture"
                        width="40"
                        height="40"
                        className="h-10 w-10 rounded-3xl"
                        unoptimized
                      />
                    </PopoverButton>
                    <AnimatePresence>
                      {open && (
                        <PopoverPanel
                          static
                          className="absolute left-0 z-50 mt-4 w-48 rounded-lg bg-black py-4 text-white shadow-xl"
                          as={motion.div}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          anchor="bottom start"
                        >
                          {profileRoutes.map((route, index) => (
                            <div key={index}>
                              <div className="px-4">
                                <CloseButton as={Link} href={route.url}>
                                  <div
                                    className={clsx(
                                      "flex items-center rounded-md px-4 py-2 transition-colors hover:bg-white/5",
                                      {
                                        "mb-2":
                                          index < profileRoutes.length - 1,
                                      },
                                    )}
                                  >
                                    <route.icon className="h-4 w-4 text-white" />
                                    <div className="ml-3 text-sm text-white">
                                      {route.title}
                                    </div>
                                  </div>
                                </CloseButton>
                              </div>
                              {index < profileRoutes.length - 1 &&
                              route.divider ? (
                                <Divider
                                  variant="middle"
                                  component="div"
                                  className="!my-2 bg-white/40"
                                />
                              ) : (
                                ""
                              )}
                            </div>
                          ))}
                        </PopoverPanel>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </Popover>
            ) : (
              <button
                onClick={() => signIn("discord")}
                className="rounded-full px-4 py-3 font-semibold text-white no-underline transition"
              >
                Sign In
              </button>
              // <Link
              //   href="/api/auth/signin"
              //   className="rounded-full px-4 py-3 font-semibold text-white no-underline transition"
              // >
              //   Sign In
              // </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
