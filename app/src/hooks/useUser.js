import { useContext } from "react";
import { UsuarioContext } from "../context/UsuarioContext";

export function useUser() {
  const context = useContext(UsuarioContext);

  if (!context) {
    throw new Error("useUser debe usarse dentro de un UsuarioProvider");
  }

  return context;
}