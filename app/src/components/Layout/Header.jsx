import { Link } from "react-router-dom";
import {
  Layers,
  List,
  Wrench,
  LogIn,
  UserPlus,
  LogOut,
  ChevronDown,
  Wallpaper,
  User,
  ChartColumn,
} from "lucide-react";

import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from "@/components/ui/menubar";
import { useUser } from "@/hooks/useUser";
import { useNavigate } from "react-router-dom";
export default function Header() {
  const { user, isAuthenticated, clearUser, authorize } = useUser();
  const userEmail = user?.Correo || "Invitado";
  const navigate = useNavigate();

  const navItems = [
    {
      title: "Subastas Activas",
      href: "subasta/Activa",
      icon: <List className="h-4 w-4" />,
      show: authorize(["Administrador" , "Comprador"]), // solo admin y comprador
    },
    {
      title: "Subastas Finalizadas",
      href: "subasta/finalizada",
      icon: <List className="h-4 w-4" />,
      show: authorize(["Administrador" , "Comprador"]), // solo admin y comprador
    },
  ];

  const mantItems = [
    {
      title: "Pinturas",
      href: "objeto/table",
      icon: <Wrench className="h-4 w-4" />,
      show: authorize(["Administrador", "Vendedor"]), // solo admin y vendedor
    },
    {
      title: "Usuarios",
      href: "usuario/table",
      icon: <Wrench className="h-4 w-4" />,
      show: authorize(["Administrador"]),
    },
    {
      title: "Subastas",
      href: "subasta/table",
      icon: <Wrench className="h-4 w-4" />,
      show: authorize(["Administrador", "Vendedor"]),
    },
    {
      title: "Reporte de Subastas por Estado",
      href: "subasta/report1",
      icon: <ChartColumn className="h-4 w-4" />,
      show: authorize(["Administrador"]),
    },
    {
      title: "Reporte de Subastas por Vendedor",
      href: "subasta/report2",
      icon: <ChartColumn className="h-4 w-4" />,
      show: authorize(["Administrador", "Vendedor"]),
    },
  ];

  const userItems = [
    {
      title: "Login",
      href: "/usuario/login",
      icon: <LogIn className="h-4 w-4" />,
      show: !isAuthenticated,
    },
    {
      title: "Registrarse",
      href: "/usuario/Register",
      icon: <UserPlus className="h-4 w-4" />,
      show: !isAuthenticated,
    },
    {
      title: "Perfil",
      href: `/usuario/detalle/${user?.idUsuario}`,
      icon: <User className="h-4 w-4" />,
      show: isAuthenticated,
   },
    {
      title: "Logout",
      href: "#",
      icon: <LogOut className="h-4 w-4" />,
      show: isAuthenticated,
      action: clearUser,
    },
  ];

  // Función reutilizable para clicks (igual que MoviesApp)
  const handleItemClick = (e, item) => {
  e.preventDefault();

  if (item.action) item.action();

  
  // 🔹 REDIRECCIÓN AL HOME
  navigate("/");
};

  return (
    <header className="w-full fixed top-0 left-0 z-50 backdrop-blur-xl bg-gradient-to-r from-primary/80 via-primary/60 to-primary/80 border-b border-white/10 shadow-lg">
      <div className="flex items-center justify-between px-6 py-3 max-w-[1280px] mx-auto text-white">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-semibold tracking-wide hover:opacity-90 transition">
          <Wallpaper className="h-6 w-6" />
          <span className="hidden sm:inline">BitArt App</span>
        </Link>

        {/* Menú Desktop - EXACTO como MoviesApp */}
        <div className="hidden md:flex flex-1 justify-center">
          <Menubar className="w-auto bg-transparent border-none shadow-none space-x-6">
            
            {/* Subastas */}
            <MenubarMenu>
              <MenubarTrigger className="text-white font-medium flex items-center gap-1 hover:text-secondary transition">
                <List className="h-4 w-4" /> Subastas
                <ChevronDown className="h-3 w-3" />
              </MenubarTrigger>
              <MenubarContent className="bg-primary/0 backdrop-blur-md border-white/10">
                {navItems
                  .filter((item) => item.show)
                  .map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="flex items-center gap-2 py-2 px-3 text-white/90 hover:bg-white/10 rounded-md transition"
                    >
                      {item.icon} {item.title}
                    </Link>
                  ))}
              </MenubarContent>
            </MenubarMenu>

            {/* Mantenimientos */}
            <MenubarMenu>
              <MenubarTrigger className="text-white font-medium flex items-center gap-1 hover:text-secondary transition">
                <Layers className="h-4 w-4" /> Mantenimientos
                <ChevronDown className="h-3 w-3" />
              </MenubarTrigger>
              <MenubarContent className="bg-primary/0 backdrop-blur-md border-white/10">
                {mantItems
                  .filter((item) => item.show)
                  .map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="flex items-center gap-2 py-2 px-3 text-white/90 hover:bg-white/10 rounded-md transition"
                    >
                      {item.icon} {item.title}
                    </Link>
                  ))}
              </MenubarContent>
            </MenubarMenu>

            {/* Usuario */}
            <MenubarMenu>
              <MenubarTrigger className="text-white font-medium flex items-center gap-1 hover:text-secondary transition">
                <User className="h-4 w-4" /> {userEmail}
                <ChevronDown className="h-3 w-3" />
              </MenubarTrigger>
              <MenubarContent className="bg-primary/0 backdrop-blur-md border-white/10">
                {userItems.filter(item => item.show).map(item => (
                  <MenubarItem key={item.href} asChild>
                    {item.action ? (
                      <button
                        onClick={(e) => handleItemClick(e, item)}
                        className="flex items-center gap-2 py-2 px-3 w-full text-left text-white/90 hover:bg-white/10 rounded-md transition"
                      >
                        {item.icon} {item.title}
                      </button>
                    ) : (
                      <Link
                        to={item.href}
                        className="flex items-center gap-2 py-2 px-3 hover:bg-white/10 rounded-md transition"
                      >
                        {item.icon} {item.title}
                      </Link>
                    )}
                  </MenubarItem>
                ))}
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>
    </header>
  );
}