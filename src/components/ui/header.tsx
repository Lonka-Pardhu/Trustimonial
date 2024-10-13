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
        await signOut();
      }}
    >
      <Button type="submit">Sign out</Button>
    </form>
  );
}

const Header = async (props: Props) => {
  const session = await auth();
  console.log(session);
  return (
    <header>
      <nav>
        <h1>Trustimonial</h1>
        <div className="w-full p-4 flex flex-row justify-between items-center">
          {session?.user ? (
            <>
              <h2>{session.user.name}</h2>
              <SignOut />
            </>
          ) : (
            <Link href="/auth/signin">
              <Button>Sign In</Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
