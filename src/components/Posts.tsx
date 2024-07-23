import { usePostsByUsers } from "../queries/posts";
import { useUsers } from "../queries/users";
import Post from "./Post";
import UserBadge from "./UserBadge";
import MaterialSymbolsAccountBox from "~icons/material-symbols/account-box";
import MaterialSymbolsArticle from "~icons/material-symbols/article";
import HumbleiconsSpinnerDots from "~icons/humbleicons/spinner-dots";
import MaterialSymbolsErrorCircleRounded from "~icons/material-symbols/error-circle-rounded";
import { useSearchParam } from "../utils/searchParams";
import { useCallback, startTransition } from "react";

export default function Posts() {
  const [selectedUserIds, setSelectedUserIds] = useSearchParam("userId");

  const posts = usePostsByUsers(selectedUserIds.map(Number));
  const users = useUsers();

  const toggleSelectUser = useCallback(
    (id?: number) => {
      if (!id) return;
      startTransition(() => {
        if (selectedUserIds.includes(id.toString())) {
          setSelectedUserIds(
            selectedUserIds.filter((userId) => userId !== id.toString())
          );
        } else {
          setSelectedUserIds([...selectedUserIds, id.toString()]);
        }
      });
    },
    [selectedUserIds]
  );

  const selectAllUsers = useCallback(() => setSelectedUserIds([]), []);

  const getUserNameFromId = useCallback(
    (id: number) => users.data?.find((user) => user.id === id)?.name ?? "",
    [users.data]
  );

  if (posts.isPending || users.isPending) {
    return (
      <div className="grid h-full min-h-0 place-items-center">
        <HumbleiconsSpinnerDots
          id="spinner"
          className="animate-spin text-5xl"
        />
      </div>
    );
  }
  if (posts.error || users.error) {
    return (
      <div className="flex h-full min-h-0 flex-col items-center justify-center gap-6 rounded bg-red-300">
        <MaterialSymbolsErrorCircleRounded className="text-5xl" />
        {posts.error?.message || users.error?.message}
      </div>
    );
  }
  return (
    <div className="flex min-h-0 flex-col gap-4">
      <h2 className="flex gap-2 text-3xl">
        <MaterialSymbolsAccountBox />
        Users
      </h2>
      <p>Select users to filter posts</p>
      <ul className="-ml-6 flex min-h-11 w-screen gap-2 overflow-x-scroll px-6 md:m-0 md:min-h-max md:w-full md:flex-wrap md:overflow-x-visible md:p-0">
        <li>
          <UserBadge
            username={"All"}
            isSelected={selectedUserIds.length === 0}
            onChange={selectAllUsers}
          />
        </li>
        {users.data.map((user) => (
          <li key={user.id}>
            <UserBadge
              username={user.name}
              userId={user.id}
              isSelected={selectedUserIds.includes(user.id.toString())}
              onChange={toggleSelectUser}
            />
          </li>
        ))}
      </ul>
      <h2 className="flex items-center gap-2 text-3xl">
        <MaterialSymbolsArticle /> Posts{" "}
        <span className="grid h-min place-items-center rounded-full bg-gray-700 px-4 text-base text-white">
          {posts.data.length}
        </span>
        {posts.isFetching && (
          <HumbleiconsSpinnerDots className="animate-spin" />
        )}
      </h2>
      <ul className="max-h-full min-h-0 space-y-2 overflow-y-scroll rounded">
        {posts.data.map((post) => (
          <li key={post.id}>
            <Post
              username={getUserNameFromId(post.userId)}
              title={post.title}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
