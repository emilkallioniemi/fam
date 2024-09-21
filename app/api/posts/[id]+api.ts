import { db } from "@/drizzle/db";
import { MessageTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function GET(request: Request, params: Record<string, string>) {
  const foundPost = await db.query.MessageTable.findFirst();
  if (foundPost) {
    return Response.json(foundPost, { status: 200 });
  }
  return Response.json("Post not found", { status: 404 });
}

export async function PUT(request: Request, params: Record<string, string>) {
  const body = await request.json();
  const updatedPost = await db
    .update(MessageTable)
    .set({
      content: body.content,
    })
    .returning();
  if (updatedPost) {
    return Response.json(updatedPost);
  }
  return Response.json("Post not found", { status: 404 });
}

export async function DELETE(request: Request, params: Record<string, number>) {
  const deletedPost = await db
    .delete(MessageTable)
    .where(eq(MessageTable.id, params.id))
    .returning();
  if (deletedPost) {
    return Response.json(deletedPost);
  }
  return Response.json("Post not found", { status: 404 });
}
