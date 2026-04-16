import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import UsuarioService from "@/services/UsuarioService";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomInputField } from "../ui/custom/custom-input-field";

const schema = yup.object({
    Correo: yup.string().email("Correo inválido").required("El correo es obligatorio"),
    Contrasenna: yup.string().required("La contraseña es obligatoria"),
});

export default function Login() {
    const { saveUser } = useUser();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = async (data) => {
    try {
        const response = await UsuarioService.loginUsuario(data);
        const resultado = response.data;

        // ✅ Verificar que data sea un string (el JWT token)
        if (resultado && typeof resultado.data === 'string') {
            saveUser(resultado.data);
            toast.success("Inicio de sesión exitoso");
            navigate("/");
        } else {
            toast.error("Credenciales inválidas");
        }
    } catch (error) {
        toast.error("Error al iniciar sesión");
        console.error(error);
    }
};


    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="w-full max-w-md shadow-lg border border-white/10 bg-white/10 backdrop-blur-lg text-white">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold">Iniciar Sesión</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div>
                            <CustomInputField
                                {...register("Correo")}
                                label="Correo electrónico"
                                placeholder="ejemplo@correo.com"
                                error={errors.Correo?.message} />
                        </div>
                        <div>
                            <Label htmlFor="Contrasenna" className="text-white">
                                Contraseña
                            </Label>
                            <Input
                                id="Contrasenna"
                                type="password"
                                placeholder="********"
                                {...register("Contrasenna")}
                                className="bg-white text-white placeholder:text-gray-400 border border-gray-300 "
                            />
                            {errors.Contrasenna && (
                                <p className="text-red-400 text-sm mt-1">{errors.Contrasenna.message}</p>
                            )}
                        </div>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-accent hover:bg-accent/90 text-white font-semibold mt-2"
                        >
                            {isSubmitting ? "Ingresando..." : "Ingresar"}
                        </Button>

                        <p className="text-sm text-center mt-4 text-gray-300">
                            ¿No tienes cuenta?{" "}
                            <a href="/usuario/Register" className="text-accent underline hover:text-accent/80">
                                Regístrate
                            </a>
                        </p>
                    </form>

                </CardContent>
            </Card>
        </div>
    );
}
