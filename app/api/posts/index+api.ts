import { db } from "@/drizzle/db";
import { MessageTable } from "@/drizzle/schema";

export async function GET(request: Request) {
  const posts = await db.query.MessageTable.findMany();
  if (posts) {
    return Response.json(posts, { status: 200 });
  }
  return Response.json("No posts found", { status: 404 });
}

export async function POST(request: Request) {
  const body = await request.json();
  if (!body.content) {
    return Response.json("Content is required", { status: 400 });
  }
  const createdPost = (
    await db
      .insert(MessageTable)
      .values({
        content: body.content,
      })
      .returning({
        id: MessageTable.id,
      })
  )[0];
  if (createdPost) {
    return Response.json(createdPost, { status: 201 });
  }
  return Response.json("Post not created", { status: 500 });
}
