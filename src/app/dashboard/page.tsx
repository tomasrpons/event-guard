import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import PrimaryTables from "~/components/primary-tables";

export default async function Home() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/");
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="flex justify-end p-2">
        <Link
          href={"/api/auth/signout"}
          className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
        >
          Cerrar sesión
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-5xl font-extrabold tracking-tight">
          Docta Capital
        </h1>
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <PrimaryTables />
        </div>
      </div>
    </main>
  );
}
