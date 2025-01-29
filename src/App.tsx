import { Button } from "./Components/button";
import { ShareIcon } from "./icon/shareIcon";
import { PlusIcon } from "./icon/plusIcon";
import { Card } from "./Components/card";
import { CreateContentModel } from "./Components/createpop";
import "./App.css";
import { useState } from "react";

function App() {
  const [modelOpen, setModelOpen] = useState(false);


  return (
    <div className="p-4 bg-black">
      <CreateContentModel
        open={modelOpen}
        onClose={() => {
          setModelOpen(false);
        }}
      />
      <div className="flex justify-end gap-4">
        <Button variant="secondary" text="Share" startIcon={<ShareIcon />} />
        <Button
          variant="primary"
          text="Add Content"
          startIcon={<PlusIcon />}
          onClick={() => setModelOpen(true)} 
        />
      </div>
      <div className="flex gap-4 py-4">
        <Card
          type="twitter"
          link="https://x.com/Duckyatduck/status/1884305325039444338"
          title="test1"
        />
        <Card
          type="youtube"
          link="https://www.youtube.com/watch?v=lfVCH6JUxmw"
          title="Best of Rajesh Khanna Hindi Songs"
        />
      </div>
    </div>
  );
}

export default App;
