import type { Metadata } from "next";
import "./globals.css";
import UserProvider from "./context/user";
import AllOverlays from "./components/AllOverlays";

export const metadata: Metadata = {
  title: "TikTok Clone",
  description: "Sort Video App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <UserProvider>
          <AllOverlays />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
