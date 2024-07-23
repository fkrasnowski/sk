import { useState } from "react";

// Warning: If ever client-side routing is used, this function must be updated (synced with router state)
export function useSearchParam(
  key: string
): [string[], (values: string[]) => void] {
  const initialParams = new URLSearchParams(location.search);

  const [params, setParams] = useState<string[]>(initialParams.getAll(key));

  const setSearchParams = (values: string[]) => {
    const params = new URLSearchParams(location.search);
    params.delete(key);
    values.forEach((value) => {
      params.append(key, value);
    });
    setParams(values);
    history.replaceState(null, "", `?${params.toString()}`);
  };

  return [params, setSearchParams];
}
