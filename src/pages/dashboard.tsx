import { Button } from "../Components/button";
import { ShareIcon } from "../icon/shareIcon";
import { PlusIcon } from "../icon/plusIcon";
import { Card } from "../Components/card";
import { CreateContentModel } from "../Components/createpop";
import { useEffect, useState } from "react";
import { SideBar } from "../Components/sidebar";
import { useContent } from "../hooks/useContent";

export function Dashboard() {
  const [modelOpen, setModelOpen] = useState(false);
  const {contents,refresh,deleteContent} = useContent()

  useEffect(() => {
    if (modelOpen) {
      refresh();
    }
  }, [modelOpen]);


  return (
    <div>
      <SideBar />
      <div className="p-3 bg-black ml-56 min-screen ">
        <CreateContentModel
          open={modelOpen}
          onClose={() => {
            setModelOpen(false);
          }}
        />
        <div className="flex justify-end gap-4 py-2">
          <Button variant="secondary" text="Share" startIcon={<ShareIcon />} />
          <Button
            variant="primary"
            text="Add Content"
            startIcon={<PlusIcon />}
            onClick={() => setModelOpen(true)}
          />
        </div>

        <div className="grid grid-cols-4 gap-4 py-5 items-stretch w-full auto-rows-fr">
          {contents.map((content) => (
            <Card
              key={content._id}
              id={content._id}
              type={content.type}
              link={content.link}
              title={content.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
