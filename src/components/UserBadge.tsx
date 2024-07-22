export default function UserBadge({ username }: { username: string }) {
  return (
    <div className="text-nowrap rounded-full bg-blue-200 p-2 px-4 text-sm font-semibold shadow-sm">
      {username}
    </div>
  );
}
