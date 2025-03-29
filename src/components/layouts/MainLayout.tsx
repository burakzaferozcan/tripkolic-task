import React from "react";
import Head from "next/head";

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title = "ORCA Softwares",
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="ORCA Softwares Application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="min-h-screen bg-gray-100">{children}</main>
    </>
  );
};
