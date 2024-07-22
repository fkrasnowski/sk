import { z } from "zod";

const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
});

const userArraySchema = z.array(userSchema);

export type User = z.infer<typeof userSchema>;

export async function getUsers(): Promise<User[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!response.ok) {
    throw new Error(`Error fetching users. Status code: ${response.status}`);
  }
  const json = await response.json();

  return userArraySchema.parse(json);
}
