import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./Components/Navbar";
import MessageList from "./Components/MessageList";
import AddMessage from "./Components/AddMessage";
import UserList from "./Components/UserList";
import AddUser from "./Components/AddUser";

const queryClient = new QueryClient();

const App = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Navbar />
        <div className="max-w-xl mx-auto p-4 space-y-8">
          <AddMessage onMessageAdded={() => setRefresh((prev) => !prev)} />
          <MessageList key={refresh} />
          <AddUser />
          <UserList />
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default App;