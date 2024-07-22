import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queries/client";
import Posts from "./components/Posts";

function App() {
  const [count, setCount] = useState(0);

  return (
    <QueryClientProvider client={queryClient}>
      <button
        className="m-4 rounded bg-emerald-600 p-4 text-yellow-200 shadow-md"
        onClick={() => setCount((count) => count + 1)}
      >
        count is {count}
      </button>
      <Posts />
    </QueryClientProvider>
  );
}

export default App;
