import { usePosts } from "../queries/posts";
import { useUsers } from "../queries/users";
import Post from "./Post";
import UserBadge from "./UserBadge";

export default function Posts() {
  const posts = usePosts();
  const users = useUsers();

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
        {users.data.map((user) => (
          <li key={user.id}>
            <UserBadge username={user.name} />
          </li>
        ))}
      </ul>
      <h1 className="text-3xl">Posts</h1>
      <ul className="space-y-2">
        {posts.data.map((post) => (
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
