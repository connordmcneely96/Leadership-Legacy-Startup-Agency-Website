"use client";

import AuthGuard from "@/components/AuthGuard";
import SuiteSidebar from "@/components/suite/SuiteSidebar";
import SuiteHeader from "@/components/suite/SuiteHeader";
import { UniversalFAB } from "@/components/suite/UniversalFAB";
import { FabActionRouter } from "@/components/suite/FabActionRouter";
import { FooterUserPanel } from "@/components/suite/FooterUserPanel";
import { ErrorBoundary } from "@/components/suite/ErrorBoundary";

export default function SuiteAuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <ErrorBoundary>
        <div className="relative min-h-screen bg-background">
          <SuiteSidebar />
          <div className="lg:ml-[280px] transition-all duration-200">
            <SuiteHeader />
            <main className="min-h-[calc(100vh-4rem)]">{children}</main>
            <UniversalFAB />
            <FabActionRouter />
            <FooterUserPanel />
          </div>
        </div>
      </ErrorBoundary>
    </AuthGuard>
  );
}
