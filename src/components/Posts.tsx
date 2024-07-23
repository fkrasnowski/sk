import { useMemo, useState } from "react";
import { usePosts } from "../queries/posts";
import { useUsers } from "../queries/users";
import Post from "./Post";
import UserBadge from "./UserBadge";
import MaterialSymbolsAccountBox from "~icons/material-symbols/account-box";
import MaterialSymbolsArticle from "~icons/material-symbols/article";

export default function Posts() {
  const posts = usePosts();
  const users = useUsers();

  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);

  const toggleSelectUser = (id: number) => {
    if (selectedUserIds.includes(id)) {
      setSelectedUserIds(selectedUserIds.filter((userId) => userId !== id));
    } else {
      setSelectedUserIds([...selectedUserIds, id]);
    }
  };

  const filteredPosts = useMemo(() => {
    // Show all posts if no users are selected
    if (selectedUserIds.length === 0) return posts.data;
    return posts.data?.filter((post) => selectedUserIds.includes(post.userId));
  }, [posts.data, selectedUserIds]);

  if (posts.isPending || users.isPending) {
    return <div className="grid min-h-0 place-items-center">Loading...</div>;
  }
  if (posts.error || users.error) {
    return <div>{posts.error?.message || users.error?.message}</div>;
  }
  return (
    <div className="flex min-h-0 flex-col gap-4">
      <h1 className="flex gap-2 text-3xl">
        <MaterialSymbolsAccountBox />
        Users
      </h1>
      <p>Select users to filter posts</p>
      <ul className="-ml-6 flex min-h-11 w-screen gap-2 overflow-x-scroll px-6 md:m-0 md:min-h-max md:w-full md:flex-wrap md:overflow-x-visible md:p-0">
        <li>
          <UserBadge
            username={"All"}
            isSelected={selectedUserIds.length === 0}
            onChange={() => setSelectedUserIds([])}
          />
        </li>
        {users.data.map((user) => (
          <li key={user.id}>
            <UserBadge
              username={user.name}
              isSelected={selectedUserIds.includes(user.id)}
              onChange={() => toggleSelectUser(user.id)}
            />
          </li>
        ))}
      </ul>
      <h1 className="flex gap-2 text-3xl">
        <MaterialSymbolsArticle /> Posts
      </h1>
      <ul className="max-h-full min-h-0 space-y-2 overflow-y-scroll rounded">
        {filteredPosts!.map((post) => (
          <li key={post.id}>
            <Post
              username={
                users.data.find((user) => user.id === post.userId)!.name
              }
              title={post.title}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
