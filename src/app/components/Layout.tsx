import { Outlet } from "react-router";
import { Header } from "./Header";
import { useEffect } from "react";

export function Layout() {

  useEffect(() => {
    // Load Google Analytics script
    const script = document.createElement("script");
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-LK96WHZGS";
    script.async = true;
    document.head.appendChild(script);

    // Initialize GA safely (avoid TS window typing issues)
    const script2 = document.createElement("script");
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){window.dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-LK96WHZGS');
    `;
    document.head.appendChild(script2);

  }, []);

  return (
    <>
      <Header />
      <main className="pt-[40px] sm:pt-[56px] bg-[#FAFAF9] min-h-screen">
        <Outlet />
      </main>
    </>
  );
}