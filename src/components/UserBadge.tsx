import { memo } from "react";

const UserBadge = memo(
  ({
    username,
    userId,
    isSelected,
    onChange,
  }: {
    username: string;

    isSelected: boolean;
    userId?: number;
    onChange: (id?: number) => void;
  }) => {
    return (
      <label className="cursor-pointer" aria-label={username}>
        <input
          type="checkbox"
          className="peer hidden"
          checked={isSelected}
          onChange={() => onChange(userId)}
        />
        <span className="block text-nowrap rounded-full bg-blue-200 p-2 px-4 text-sm font-semibold shadow-sm peer-checked:bg-slate-600 peer-checked:text-white">
          {username}
        </span>
      </label>
    );
  }
);

export default UserBadge;
