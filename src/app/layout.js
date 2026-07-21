// app/layout.js
import "@/styles/globals.css";
import { AuthProvider } from "@/context/AuthProvider";

export const metadata = {
  title: "Ni-Q Cleaning Solutions",
  description: "Quality cleaning products online store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
