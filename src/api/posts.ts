import { z } from "zod";
import { validateSchema } from "./validation";

const postSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string(),
  z: z.string(),
});

const postArraySchema = z.array(postSchema);

export type Post = z.infer<typeof postSchema>;

export async function getPosts(): Promise<Post[]> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`);
  if (!response.ok) {
    throw new Error(`Error fetching posts. Status code: ${response.status}`);
  }
  const json = await response.json();
  return validateSchema(postArraySchema, json);
}

export async function getPostsByUsers(
  userIds: number[],
  signal?: AbortSignal
): Promise<Post[]> {
  const searchParams = new URLSearchParams();
  userIds.forEach((userId) => {
    searchParams.append("userId", userId.toString());
  });
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/posts?${searchParams.toString()}`,
    { signal }
  );
  if (!response.ok) {
    throw new Error(`Error fetching posts. Status code: ${response.status}`);
  }
  const json = await response.json();

  return validateSchema(postArraySchema, json);
}
