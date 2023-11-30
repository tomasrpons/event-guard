"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";
import Link from "next/link";

const tabs = [
  {
    name: "Futures",
    href: "/dashboard/spot",
  },
  {
    name: "Spot",
    href: "/dashboard/futures",
  },
];
type TabsProps = {
  // Whatever props
};

const Tabs: React.FC<TabsProps> = (props) => {
  const pathname = usePathname();

  return (
    <div className={"mb-4 flex items-center"}>
      {tabs.map((tab) => (
        <Link
          href={tab.href}
          key={tab.href}
          className={cn(
            "flex items-center px-4",
            pathname?.startsWith(tab.href)
              ? "font-bold text-primary"
              : "font-medium text-muted-foreground",
          )}
        >
          {tab.name}
        </Link>
      ))}
    </div>
  );
};

export default Tabs;
