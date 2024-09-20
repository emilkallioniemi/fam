import { sql } from "@vercel/postgres";

export async function GET(request: Request, params: Record<string, string>) {
  const result = await sql`SELECT * FROM POSTS WHERE id = ${params.id}`;
  const foundPost = result.rows[0];
  if (foundPost) {
    return Response.json(foundPost, { status: 200 });
  }
  return Response.json("Post not found", { status: 404 });
}

export async function PUT(request: Request, params: Record<string, string>) {
  const body = await request.json();
  const result = await sql`
      UPDATE POSTS 
      SET post = ${body.post} 
      WHERE id = ${params.id} 
      RETURNING *
    `;
  const updatedPost = result.rows[0];
  if (updatedPost) {
    return Response.json(updatedPost);
  }
  return Response.json("Post not found", { status: 404 });
}

export async function DELETE(request: Request, params: Record<string, string>) {
  const result =
    await sql`DELETE FROM POSTS WHERE id = ${params.id} RETURNING id`;
  const deletedPost = result.rows[0];
  if (deletedPost) {
    return Response.json(deletedPost);
  }
  return Response.json("Post not found", { status: 404 });
}
