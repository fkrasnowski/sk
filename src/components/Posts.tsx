import { usePosts } from "../queries/posts";
import { useUsers } from "../queries/users";

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
      <h1>Users</h1>
      <ul>
        {users.data.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <h1>Posts</h1>
      <ul>
        {posts.data.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
