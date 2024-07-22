import { useQuery } from "@tanstack/react-query";
import { getPosts, type Post } from "../api/posts";

export function usePosts() {
  return useQuery<Post[]>({ queryKey: ["posts"], queryFn: getPosts });
}
