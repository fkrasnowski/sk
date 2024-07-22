export default function UserBadge({
  username,
  isSelected,
  onChange,
}: {
  username: string;
  isSelected: boolean;
  onChange: () => void;
}) {
  return (
    <label className="cursor-pointer">
      <input
        type="checkbox"
        className="peer hidden"
        checked={isSelected}
        onChange={onChange}
      />
      <span className="block text-nowrap rounded-full bg-blue-200 p-2 px-4 text-sm font-semibold shadow-sm peer-checked:bg-slate-600 peer-checked:text-white">
        {username}
      </span>
    </label>
  );
}
