import ReactQueryProvider from "@/lib/ReactQueryProvider";
import "./globals.css";
import { store } from "@/store/store";
import { Provider } from "react-redux";

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
        <ReactQueryProvider>
          <Provider store={store}>{children}</Provider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
