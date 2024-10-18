"use server";
import { auth, signIn, signOut } from "@/auth";
import Link from "next/link";
import { Button } from "./button";
import Image from "next/image";

type Props = {};

function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <Button type="submit">Sign out</Button>
    </form>
  );
}

const Header = async (props: Props) => {
  const session = await auth();

  return (
    <header>
      <nav className="w-full p-2 flex flex-row items-center justify-between mx-auto border-b border-1">
        <h1>Trustimonial</h1>
        <div>
          {session?.user ? (
            <div className="flex flex-row items-center gap-x-2">
              <div className="flex flex-col items-center gap-y-1">
                {session?.user?.image && session?.user?.name && (
                  <Image
                    src={session.user.image}
                    alt={session.user.name}
                    width={35}
                    height={35}
                    className="rounded-full"
                  />
                )}
                <p className="text-sm">{session.user.name}</p>
              </div>
              <SignOut />
            </div>
          ) : (
            <Link href="/auth/signin">
              <Button className="bg-white text-black">Sign In</Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
