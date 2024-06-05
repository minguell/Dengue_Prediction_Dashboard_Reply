import { PrismaClient } from "@prisma/client";

export function getPrismaClient(client?: PrismaClient){
  return (client) ? client : new PrismaClient();
}

export async function endPrismaClient(prisma: PrismaClient, client?: PrismaClient){
  if (!client){
    await prisma.$disconnect();
  }
}