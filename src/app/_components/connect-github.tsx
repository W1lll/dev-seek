"use client"

import React from "react";
import { signIn } from "next-auth/react";
import { Button } from "~/components/ui/button";

export default function ConnectGithub() {
  return (
    <Button onClick={() => signIn("github")} color="primary">Connect GitHub</Button>
  );
};
