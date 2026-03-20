import Header from "./Header";
import { Footer } from "./Footer";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { UsuarioProvider } from "@/context/UsuarioProvider";
//import { useEffect, useContext } from "react";
//import { UsuarioContext } from "@/context/UsuarioContext";

export function Layout() {
  return (
    <UsuarioProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 pt-16 pb-16">
          <Toaster position ="bottom-right" /> 
          <Outlet />
        </main>
        <Footer />
      </div>
    </UsuarioProvider>
  );
}
