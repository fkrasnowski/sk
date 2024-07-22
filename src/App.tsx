import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queries/client";
import Posts from "./components/Posts";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Posts />
    </QueryClientProvider>
  );
}

export default App;
