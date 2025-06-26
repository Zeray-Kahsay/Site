import ReactQueryProvider from "@/lib/ReactQueryProvider";

import "./globals.css";

export const metadata = {
  title: "Site.com",
  description: "Cut not only hair, but time and cost",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
