import { useState } from "react";
import Navbar from "./components/Navbar";
import Jobs from "./pages/Jobs";
import TopBar from "./components/TopBar";
import SubscribePopup from "./components/SubscribePopup";

function App() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <TopBar onJoinClick={() => setShowPopup(true)} />

      <Navbar />
      <Jobs />

      <SubscribePopup
        show={showPopup}
        onClose={() => setShowPopup(false)}
      />
    </>
  );
}

export default App;