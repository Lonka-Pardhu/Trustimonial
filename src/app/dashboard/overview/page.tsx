import EmbedPinnedCarousel from "@/app/embed/pinned/page";
import CopyIframe from "@/components/CopyIframe";
import CreateSpaceForm from "@/components/CreateSpaceForm";
import Header from "@/components/HeaderNav";
import SpaceCard from "@/components/SpaceCard";
import { SessionProvider } from "next-auth/react";
import React from "react";

const Overview = () => {
  return (
    <SessionProvider>
      <div className="w-full">
        <div className="p-2">
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

export default Overview;
