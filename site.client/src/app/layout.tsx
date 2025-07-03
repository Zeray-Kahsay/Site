import "./globals.css";
import Providers from "@/components/Providers";

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
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
