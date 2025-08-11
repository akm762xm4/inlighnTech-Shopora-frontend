import Navbar from "./Navbar";
import FloatingCheckoutButton from "./FloatingCheckoutButton";
import type { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen bg-primary text-secondary transition-colors duration-300 relative">
      <Navbar />
      <main className="flex-grow w-full max-w-7xl mx-auto md:px-4 px-2 md:py-8 py-4">
        {children}
      </main>
      <FloatingCheckoutButton />
    </div>
  );
};

export default Layout;
