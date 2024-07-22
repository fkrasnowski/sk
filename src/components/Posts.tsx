import { useMemo, useState } from "react";
import { usePosts } from "../queries/posts";
import { useUsers } from "../queries/users";
import Post from "./Post";
import UserBadge from "./UserBadge";

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
    return <div>Loading...</div>;
  }
  if (posts.error || users.error) {
    return <div>{posts.error?.message || users.error?.message}</div>;
  }
  return (
    <div>
      <h1 className="text-3xl">Users</h1>
      <ul className="flex flex-wrap gap-2">
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
      <h1 className="text-3xl">Posts</h1>
      <ul className="space-y-2">
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
