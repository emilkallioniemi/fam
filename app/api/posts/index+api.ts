import { sql } from "@vercel/postgres";

export async function GET(request: Request) {
  const result = await sql`SELECT * from POSTS`;
  const posts = result.rows;
  if (posts) {
    return Response.json(posts, { status: 200 });
  }
  return Response.json("No posts found", { status: 404 });
}

export async function POST(request: Request) {
  const body = await request.json();
  const result =
    await sql`INSERT INTO POSTS (post) VALUES (${body.post}) RETURNING id`;
  const createdPost = result.rows[0].id;
  if (createdPost) {
    return Response.json(createdPost, { status: 201 });
  }
  return Response.json("Post not created", { status: 500 });
}
