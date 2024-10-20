import { auth } from "@/auth";
import CreateSpaceForm from "@/components/CreateSpaceForm";
import SpaceCard from "@/components/SpaceCard";
import Header from "@/components/header";
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

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
              Your Spaces
            </h2>
            {/* <div className="flex flex-row items-center w-full gap-x-1"> */}
            <SpaceCard />
            {/* </div> */}
          </div>
          <CreateSpaceForm />
        </div>
      </div>
    </SessionProvider>
  );
};

export default Dashboard;
