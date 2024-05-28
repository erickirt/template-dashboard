"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/app/siteConfig";
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation";

const navigationSettings = [
  { name: "General", href: siteConfig.baseLinks.general },
  { name: "Billing & Usage", href: siteConfig.baseLinks.billing },
  { name: "Users", href: siteConfig.baseLinks.users },
];

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    // @SEV/CHRIS: what HTML semantics here in parent?    
    <section className="p-4 sm:pt-7 sm:px-6 sm:pb-6">
      <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
        Settings
      </h1>
      <TabNavigation className="mt-8">
        {navigationSettings.map((item) => (
          <TabNavigationLink
            key={item.name}
            asChild
            active={pathname === item.href}
          >
            <Link href={item.href}>{item.name}</Link>
          </TabNavigationLink>
        ))}
      </TabNavigation>
      <div className="mt-6">{children}</div>
    </section>
  );
}
