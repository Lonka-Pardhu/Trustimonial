"use client";
import { useSession, signIn } from "next-auth/react";
import React from "react";
import { Button } from "./ui/button";

const ClientComponent = () => {
  const session = useSession();

  const handleClick = () => {
    if (session?.data?.user) {
      alert("clicker");
    } else {
      alert("please login");
      signIn();
    }
  };

  return (
    <div>
      <p>hey this is client component</p>
      <Button onClick={() => handleClick()}>click me</Button>
    </div>
  );
};

export default ClientComponent;
