import { usePosts } from "../queries/posts";

export default function Posts() {
  const { isPending, error, data } = usePosts();

  if (isPending) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <div>
      <ul>{data?.map((post: any) => <li key={post.id}>{post.title}</li>)}</ul>
    </div>
  );
}
