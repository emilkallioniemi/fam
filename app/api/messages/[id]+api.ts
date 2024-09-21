import { db } from "@/drizzle/db";
import { MessageTable } from "@/drizzle/schema";
import { validateRequest } from "@/utils/zod";
import { eq } from "drizzle-orm";
import { z } from "zod";

export async function GET(request: Request, params: Record<string, string>) {
  const foundMessage = await db.query.MessageTable.findFirst();
  if (foundMessage) {
    return Response.json(foundMessage, { status: 200 });
  }
  return Response.json("Message not found", { status: 404 });
}

export async function PUT(request: Request, params: Record<string, string>) {
  const putMessageSchema = z.object({
    content: z.string(),
  });
  const validatedBody = await validateRequest(request, putMessageSchema);
  const updatedMessage = await db
    .update(MessageTable)
    .set({
      content: validatedBody.content,
    })
    .returning();
  if (updatedMessage) {
    return Response.json(updatedMessage);
  }
  return Response.json("Message not found", { status: 404 });
}

export async function DELETE(request: Request, params: Record<string, number>) {
  const deletedMessage = await db
    .delete(MessageTable)
    .where(eq(MessageTable.id, params.id))
    .returning();
  if (deletedMessage) {
    return Response.json(deletedMessage);
  }
  return Response.json("Message not found", { status: 404 });
}
