import { db } from "@/drizzle/db";
import { MessageTable } from "@/drizzle/schema";
import { validateRequest } from "@/utils/zod";
import { z } from "zod";

export async function GET(request: Request) {
  const posts = await db.query.MessageTable.findMany();
  if (posts) {
    return Response.json(posts, { status: 200 });
  }
  return Response.json("No messages found", { status: 404 });
}

export async function POST(request: Request) {
  const postMessageSchema = z.object({
    content: z.string({
      required_error: "Content is required",
    }),
  });
  const validatedBody = await validateRequest(request, postMessageSchema);
  const createdPost = (
    await db
      .insert(MessageTable)
      .values({
        content: validatedBody.content,
      })
      .returning({
        id: MessageTable.id,
      })
  )[0];
  if (createdPost) {
    return Response.json(createdPost, { status: 201 });
  } else {
    return Response.json({ error: "Message not created" }, { status: 500 });
  }
}
