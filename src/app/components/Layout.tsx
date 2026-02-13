import { Outlet } from "react-router";
import { Header } from "./Header";

export function Layout() {
  return (
    <>
      <Header />

      {/* Global page offset for fixed header */}
      <main className="pt-[40px] sm:pt-[56px] bg-[#FAFAF9] min-h-screen">
        <Outlet />
      </main>
    </>
  );
}
