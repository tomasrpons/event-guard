"use client";

import { redirect } from "next/navigation";
export default function Home() {
  redirect("/dashboard/futuros/dolar");
  return <></>;
}
