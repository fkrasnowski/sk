import { useQuery, type QueryFunction } from "@tanstack/react-query";
import { getPosts, getPostsByUsers, type Post } from "../api/posts";
import { queryClient } from "./client";
import { useCallback } from "react";

export function usePosts() {
  return useQuery<Post[]>({ queryKey: ["posts"], queryFn: getPosts });
}

export function usePostsByUsers(userIds: number[]) {
  const queryKey =
    userIds.length === 0 ? ["posts"] : ["posts", "users", userIds];
  return useQuery<Post[]>({
    queryKey,
    queryFn: async ({ signal }) => {
      // Cancel any pending queries if userIds changes
      await queryClient.cancelQueries({
        predicate: (query) =>
          query.queryKey[0] === "posts" &&
          JSON.stringify(query.queryKey[1]) == JSON.stringify(userIds),
      });

      const posts = await getPostsByUsers(userIds, signal);

      // Update the posts in the cache
      queryClient.setQueryData(["posts"], (prev?: Post[]) => {
        const newPosts = [...(prev ?? [])];
        for (const post of posts) {
          if (!newPosts.some((p) => p.id === post.id)) {
            newPosts.push(post);
          }
        }
        return newPosts.sort((a, b) => a.userId - b.userId);
      });

      return posts;
    },

    initialData: useCallback(() => {
      const posts = queryClient.getQueryData<Post[]>(["posts"]);
      if (!posts) return [];
      // Return all posts if no users are selected
      if (userIds.length === 0) return posts;
      return posts.filter((post) => userIds.includes(post.userId));
    }, [userIds]),
  });
}
