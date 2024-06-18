// getServerSession.js

import { getServerAuthSession } from "~/server/auth";

export async function getServerSession() {
  return await getServerAuthSession();
}