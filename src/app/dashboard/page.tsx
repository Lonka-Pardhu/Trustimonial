import { auth } from "@/auth";
import CreateSpaceForm from "@/components/CreateSpaceForm";
import Header from "@/components/ui/header";
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
        <div className="h-screen w-full flex items-center justify-center">
          {/* <h1>Work in progress...</h1> */}
          <CreateSpaceForm />
        </div>
      </div>
    </SessionProvider>
  );
};

export default Dashboard;
