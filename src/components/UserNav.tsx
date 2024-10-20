"use client"; // Make this component client-side
import { signOut, signIn } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface UserNavProps {
  session: any; // Session object from auth
}

const UserNav: React.FC<UserNavProps> = ({ session }) => {
  if (!session?.user) {
    return (
      <Link href="/auth/signin">
        <Button className="bg-white text-black">Sign In</Button>
      </Link>
    );
  }
  return (
    <>
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={session.user?.image ?? ""}
                  alt={session.user?.name || "User"}
                  className="w-full h-full"
                />
                <AvatarFallback>
                  {session.user?.name?.charAt(0) ?? "U"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {session.user?.name}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {session.user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <Button
              onClick={async () => {
                await signOut({ callbackUrl: "/" }); // Sign out and redirect to homepage
              }}
              className="w-full"
            >
              Sign out
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href="/auth/signin">
          <Button className="bg-white text-black">Sign In</Button>
        </Link>
      )}
    </>
  );
};

export default UserNav;
