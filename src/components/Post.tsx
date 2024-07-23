import { memo } from "react";
import type { Post } from "../api/posts";

const Post = memo(
  ({ title, username }: { title: string; username: string }) => {
    return (
      <div data-testid="post" className="rounded bg-violet-200 p-2 shadow-sm">
        <p className="text-sm font-bold">{username}</p>
        <h1 className="text-lg">{title}</h1>
      </div>
    );
  }
);

export default Post;
