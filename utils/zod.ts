import { z, ZodError } from "zod";

export const validateRequest = async <T>(
  request: Request,
  schema: z.ZodSchema<T>
): Promise<T> => {
  try {
    const body = await request.json();
    return schema.parse(body);
  } catch (error) {
    if (error instanceof ZodError) {
      // Throw a custom error or return a response
      throw new Response(
        JSON.stringify({
          error: "Validation failed",
          details: error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      throw new Response(JSON.stringify({ error: "Internal Server Error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
};
