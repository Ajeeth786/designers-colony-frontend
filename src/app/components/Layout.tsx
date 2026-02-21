import { Outlet } from "react-router";
import { Header } from "./Header";
import { useEffect } from "react";

export function Layout() {

  useEffect(() => {
    const script1 = document.createElement("script");
    script1.src = "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX";
    script1.async = true;
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX');
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