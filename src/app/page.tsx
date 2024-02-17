"use client";

import { redirect } from "next/navigation";
import { useStratexContext } from "~/hooks/stratex-hooks";
export default function Home() {
  // const { isMarketClosed } = useStratexContext();

  // if (isMarketClosed) {
  //   redirect("/closed");
  // } else redirect("/dashboard/futuros/acciones");
  redirect("/dashboard/futuros/acciones");
  return <></>;
}
