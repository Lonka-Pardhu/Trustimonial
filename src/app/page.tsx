"use client";

import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";

export default function SignInPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      // Redirect to dashboard if user is already authenticated
      router.replace("/dashboard/overview");
    }
  }, []);

  // if (status === "loading") {
  //   return (
  //     <div className="h-screen w-full flex items-center justify-center">
  //       <div className="flex items-center p-2 rounded-lg text-white bg-black">
  //         <p>Loading...</p>
  //         <LoaderCircle className="animate-spin" />
  //       </div>
  //     </div>
  //   );
  // }

  // If user is unauthenticated, show sign-in button
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1>Welcome to the only place to handle all your testimonials</h1>
      <p>
        Explore what we offer and learn how we can help you manage your customer
        feedback.
      </p>

      <Link href="/signIn">
        <Button>Sign In</Button>
      </Link>
    </div>
  );
}
