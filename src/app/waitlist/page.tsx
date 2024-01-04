"use client";

import Logo from "~/components/logo";
import { Button } from "~/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#14afff] to-[#0852a0]">
      <Logo />
      <h1 className="mt-4 text-center text-2xl text-primary-foreground">
        Market data en tiempo real
      </h1>
      <form className="mt-8 w-full max-w-md p-4">
        <div className="flex flex-col space-y-4">
          <input
            aria-label="Email address"
            className="w-full rounded bg-primary-foreground px-4 py-2 text-gray-700"
            id="email"
            placeholder="Ingresa tu email"
            type="email"
          />
          <Button className="w-full bg-[#0a3261]" variant="default">
            Unirse a la Waitlist
          </Button>
        </div>
      </form>
    </div>
  );
}
