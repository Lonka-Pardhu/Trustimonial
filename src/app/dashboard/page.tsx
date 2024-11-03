import React from "react";
import { auth } from "@/auth";
import CreateSpaceForm from "@/components/CreateSpaceForm";
import SpaceCard from "@/components/SpaceCard";
import Header from "@/components/HeaderNav";
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";
import EmbedPinnedCarousel from "../embed/pinned/page";
import CopyIframe from "@/components/CopyIframe";

const Dashboard = async () => {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <SessionProvider>
      <div>
        <Header />
        <div className="p-2">
          <div className="mt-2">
            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              Your Boards
            </h2>
            {/* <div className="flex flex-row items-center w-full gap-x-1"> */}
            <SpaceCard />
            {/* </div> */}
          </div>
          <div className="mt-5">
            <CreateSpaceForm />
          </div>
          <div>
            <h3 className="pt-4 text-3xl font-semibold tracking-tight first:mt-0">
              Embed pinned reviews carousel preview:
            </h3>
            <br />
            <EmbedPinnedCarousel />
            <CopyIframe />
          </div>
        </div>
      </div>
    </SessionProvider>
  );
};

export default Dashboard;
