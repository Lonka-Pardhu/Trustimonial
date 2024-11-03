"use server";
import { auth } from "@/auth";
import UserNav from "./UserNav";

type Props = {};

const Header = async (props: Props) => {
  const session = await auth();

  return (
    <header>
      <nav className="w-full p-2 flex flex-row items-center justify-between mx-auto border-b border-1">
        <h1>Trustimonial</h1>
        <p className="text-2xl">Dashboard</p>

        <div>
          <UserNav session={session} />
        </div>
      </nav>
    </header>
  );
};

export default Header;
