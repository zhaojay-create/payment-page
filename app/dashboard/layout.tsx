import FooterNavLink from "@/components/common/FooterNavLink";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <div className="min-h-screen bg-blue-50">
          {children}
          <FooterNavLink />
        </div>
      </body>
    </html>
  );
}
