import Navbar from "@/components/items/Navbar";
import "./globals.css";
import Providers from "@/components/Providers";
import AppInit from "@/AppInit";

export const metadata = {
  title: "Site.com",
  description: "Easy, Secure and Cheap",
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
          <AppInit />
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
