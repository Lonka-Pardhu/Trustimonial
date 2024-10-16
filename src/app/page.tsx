import Image from "next/image";
import Header from "@/components/ui/header";
import { Button } from "@/components/ui/button";
import { SessionProvider } from "next-auth/react";
import ClientComponent from "@/components/ClientComponent";

export default function Home() {
  return (
    <SessionProvider>
      <div>
        <Header />
        <div className="h-screen w-full flex items-center justify-center">
          {/* <h1>Work in progress...</h1> */}
          <ClientComponent />
        </div>
      </div>
    </SessionProvider>
  );
}
