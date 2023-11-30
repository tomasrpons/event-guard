import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
import PrimaryTables from "~/components/primary-tables";

export default async function Home() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/");
  }

  return <PrimaryTables />;
}
