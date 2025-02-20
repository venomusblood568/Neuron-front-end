import { Button } from "../Components/button";
import { ShareIcon } from "../icon/shareIcon";
import { PlusIcon } from "../icon/plusIcon";
import { Card } from "../Components/card";
import { CreateContentModel } from "../Components/createpop";
import { useState } from "react";
import { SideBar } from "../Components/sidebar";

export function Dashboard() {
  const [modelOpen, setModelOpen] = useState(false);

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
        <div className="grid grid-cols-4 gap-4 py-5 items-start w-full">
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
          <Card
            type="blog"
            link="https://developer.hashicorp.com/terraform/intro"
            title="What is Terraform?"
          />
          <Card
            type="medium"
            link="https://medium.com/@bluecodes/how-to-make-ur-chrome-extension-23df40192349"
            title="Extension"
          />
          <Card
            type="youtube"
            link="https://youtube.com/shorts/o4ceJoU8dT4?si=U35um_Ek8eM2YnLh"
            title="Pc"
          />
          <Card
            type="article"
            link="https://www.tatvasoft.com/blog/what-are-orms-and-how-does-it-work/"
            title="What are ORMs and How does It Work?"
          />
          <Card
            type="article"
            link="https://projects.100xdevs.com/tracks/gZf9uBBNSbBR7UCqyyqT/prisma-4"
            title="Prisma"
          />
          <Card
            type="instagram"
            link="https://www.instagram.com/reel/DFHHioEo5V9/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
            title="Thar"
          />
        </div>
      </div>
    </div>
  );
}
