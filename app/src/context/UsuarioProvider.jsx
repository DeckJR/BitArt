import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { UsuarioContext } from "./UsuarioContext";
import PropTypes from "prop-types";
//para avance 4
// Cargar usuario desde localStorage
function loadUserFromStorage() {
  const storedUser = localStorage.getItem("usuario");
  if (!storedUser) return null;
  try {
    return JSON.parse(storedUser);
  } catch (error) {
    console.error("Error al leer el usuario:", error);
    return null;
  }
}

export function UsuarioProvider({ children }) {
  const [usuario, setUsuario] = useState(() => loadUserFromStorage());

  // Mantener localStorage sincronizado
  useEffect(() => {
    if (usuario) {
      localStorage.setItem("usuario", JSON.stringify(usuario));
    } else {
      localStorage.removeItem("usuario");
    }
  }, [usuario]);

  // Login: reemplaza completamente los valores del usuario
  const login = (nuevosValores) => {
  // Creamos un objeto nuevo con spread y añadimos un campo temporal para forzar cambio de referencia
  const usuarioActualizado = {
    id: nuevosValores.id || "3",
    nombre: nuevosValores.nombre || "Jose María Cubillo Gutierrez",
    correo: nuevosValores.correo || "gutierrezjosem@gmail.com",
    rol: nuevosValores.rol || "Vendedor",
    estado: nuevosValores.estado || "Activo",
    __updated: Date.now() // campo temporal para forzar nueva referencia
  };

  setUsuario(usuarioActualizado);

  // Sobrescribimos localStorage inmediatamente
  localStorage.setItem("usuario", JSON.stringify(usuarioActualizado));

  toast.success(`Bienvenido ${usuarioActualizado.nombre}`);
};

  const logout = () => {
    if (usuario) toast(`Sesión cerrada: ${usuario.nombre}`);
    setUsuario(null);
  };

  const isVendedor = () => usuario?.rol?.toLowerCase() === "vendedor";
  const hasRole = (rol) => usuario?.rol === rol;

  const value = {
    usuario,
    login,
    logout,
    isVendedor,
    hasRole,
  };

  return (
    <UsuarioContext.Provider value={value}>
      {children}
    </UsuarioContext.Provider>
  );
}

UsuarioProvider.propTypes = {
  children: PropTypes.node.isRequired,
}; 
