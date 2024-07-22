import { z } from "zod";

const postSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string(),
});

const postArraySchema = z.array(postSchema);

export type Post = z.infer<typeof postSchema>;

export async function getPosts(): Promise<Post[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) {
    throw new Error(`Error fetching posts. Status code: ${response.status}`);
  }
  const json = await response.json();
  return postArraySchema.parse(json);
}
