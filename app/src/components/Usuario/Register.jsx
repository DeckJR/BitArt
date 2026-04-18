import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import UsuarioService from "@/services/UsuarioService";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/* ✅ MISMO REGISTER, SOLO 3 NOMBRES */
const schema = yup.object({
  Nombre: yup.string().required("El nombre es obligatorio"),
  Apellido1: yup.string().required("El primer apellido es obligatorio"),
  Apellido2: yup.string().required("El segundo apellido es obligatorio"),
  Correo: yup.string().email("Correo inválido").required("El correo es obligatorio"),
  Contrasenna: yup.string().min(6, "Mínimo 6 caracteres").required("La contraseña es obligatoria"),
});

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      Nombre: "",
      Apellido1: "",
      Apellido2: "",
      Correo: "",
      Contrasenna: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      // ✅ Se adapta al backend sin cambiar el flujo
      const payload = {
        Nombre: data.Nombre,
        Apellido1: data.Apellido1,
        Apellido2: data.Apellido2,
        Correo: data.Correo,
        Contrasenna: data.Contrasenna,
        idRol: 3,            // Comprador
        idEstadoUsuario: 1,  // Activo
      };

      const response = await UsuarioService.createUsuario(payload);

      if (response?.data) {
        toast.success("Usuario creado correctamente");
        navigate("/usuario/login");
      } else {
        toast.error("No se pudo crear el usuario");
      }
    } catch (error) {
      toast.error("Error al crear usuario");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Crear Cuenta
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* Nombre */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  {/* Nombre */}
  <div>
    <Label>Nombre</Label>
    <Input {...register("Nombre")} />
    {errors.Nombre && (
      <p className="text-red-500 text-sm">{errors.Nombre.message}</p>
    )}
  </div>

  {/* Primer Apellido */}
  <div>
    <Label>Primer Apellido</Label>
    <Input {...register("Apellido1")} />
    {errors.Apellido1 && (
      <p className="text-red-500 text-sm">{errors.Apellido1.message}</p>
    )}
  </div>

  {/* Segundo Apellido */}
  <div>
    <Label>Segundo Apellido</Label>
    <Input {...register("Apellido2")} />
    {errors.Apellido2 && (
      <p className="text-red-500 text-sm">{errors.Apellido2.message}</p>
    )}
  </div>
</div>


            {/* Correo */}
            <div>
              <Label>Correo</Label>
              <Input type="email" {...register("Correo")} />
              {errors.Correo && <p className="text-red-500 text-sm">{errors.Correo.message}</p>}
            </div>

            {/* Contraseña */}
            <div>
              <Label>Contraseña</Label>
              <Input type="password" {...register("Contrasenna")} />
              {errors.Contrasenna && <p className="text-red-500 text-sm">{errors.Contrasenna.message}</p>}
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Creando..." : "Crear cuenta"}
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}