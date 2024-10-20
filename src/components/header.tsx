"use server";
import { auth, signIn, signOut } from "@/auth";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import UserNav from "./UserNav";

type Props = {};

const Header = async (props: Props) => {
  const session = await auth();
  console.log(session);

  return (
    <header>
      <nav className="w-full p-2 flex flex-row items-center justify-between mx-auto border-b border-1">
        <h1>Trustimonial</h1>
        <div>
          <UserNav session={session} />
        </div>
      </nav>
    </header>
  );
};

export default Header;
