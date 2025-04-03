import { useState } from "react";
import Navbar from "./Components/Navbar";
import MessageList from "./Components/MessageList";
import AddMessage from "./Components/AddMessage";

const App = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto p-4">
        <AddMessage onMessageAdded={() => setRefresh((prev) => !prev)} />
        <MessageList key={refresh} />
      </div>
    </div>
  );
};

export default App;