import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";

export default async function Home() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Strela
        </h1>
        <div className="text-center text-lg">Dash!</div>
      </div>
    </main>
  );
}
