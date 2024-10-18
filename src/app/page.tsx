"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl mb-8">Sign In to Your Account</h1>

      <Button
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        className="bg-blue-500 text-white p-4 rounded"
      >
        Sign In with Google
      </Button>
    </div>
  );
}
