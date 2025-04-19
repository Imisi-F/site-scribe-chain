
import { MainNav } from "./MainNav";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNav />
      <main className="flex-1 container mx-auto px-4 py-6 md:py-10">
        {children}
      </main>
      <SonnerToaster position="top-right" />
    </div>
  );
}
