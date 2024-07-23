import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queries/client";
import Posts from "./components/Posts";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="mx-auto flex h-screen w-screen max-w-3xl flex-col gap-4 overflow-x-hidden p-6">
        <h1 className="text-5xl">Placeholder Posts</h1>
        <p>A simple app to display posts from JSONPlaceholder API</p>
        <Posts />
      </div>
    </QueryClientProvider>
  );
}

export default App;
