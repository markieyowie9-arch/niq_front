// app/layout.js
import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapClient from "@/components/BootstrapClient";
import { AuthProvider } from "@/context/AuthProvider";

export const metadata = {
  title: "Ni-Q Cleaning Solutions",
  description: "Quality cleaning products online store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
          <BootstrapClient />
        </AuthProvider>
      </body>
    </html>
  );
}
