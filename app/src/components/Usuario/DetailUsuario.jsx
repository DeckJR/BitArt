import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UsuarioService from '../../services/UsuarioService';
import { ErrorAlert } from "../ui/custom/ErrorAlert";
// Shadcn UI Components
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    FileClock,
    Clock,
    User,
    Mail,
    Hash,
    ArrowLeft
} from "lucide-react";
import { LoadingGrid } from '../ui/custom/LoadingGrid';
import { EmptyState } from '../ui/custom/EmptyState';

export function DetailUsuario() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [usuario, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await UsuarioService.getUsuarioById(id);
                // Si la petición es exitosa, se guardan los datos
                console.log(response.data)
                setData(response.data);
                if(!response.data.success){
                    setError(response.data.message)
                }
            } catch (err) {
                // Si el error no es por cancelación, se registra
                if (err.name !== "AbortError") setError(err.message);
            } finally {
                // Independientemente del resultado, se actualiza el loading
                setLoading(false);
            }
        };
        fetchData(id)
    }, [id]);


    if (loading) return <LoadingGrid count={1} type="grid" />;
    if (error) return <ErrorAlert title="Error al cargar pinturas" message={error} />;
    if (!usuario || usuario.data.length === 0)
        return <EmptyState message="No se encontraron pinturas en esta tienda." />;
    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <div className="flex flex-col md:flex-row gap-8 items-start">
                
                {/* Sección de los Detalles */}
                <div className="flex-1 space-y-6">
                    {/* Nombre del usuario*/}
                    <div>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                        {usuario.data.nombreCompleto}
                        </h1>
                    </div>
                    <Card>
                        <CardContent className="p-6 space-y-6">
                            {/* Información del rol y estado*/}
                            <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
                                {/* rol */}
                                <div className="flex items-center gap-4">
                                    <User className="h-5 w-5 text-primary" />
                                    <span className="font-semibold">Rol:</span>
                                    <p className="text-muted-foreground">
                                    {usuario.data.rol}
                                    </p>
                                </div>
                                {/* estado */}
                                <div className="flex items-center gap-4">
                                    <FileClock className="h-5 w-5 text-primary" />
                                    <span className="font-semibold">Estado:</span>
                                    <p className="text-muted-foreground">
                                        {usuario.data.estado}
                                    </p>
                                </div>                                
                            </div>

                            {/* Contenedor de dos columnas para fecha de registro y el historial mínimo asociado */}
                            <div className="grid gap-4 md:grid-cols-2">
                                {/* Fecha de Registro */}
                                <div className="flex items-center gap-4">
                                    <Clock className="h-5 w-5 text-primary" />
                                    <span className="font-semibold">Fecha de Registro:</span>
                                    <p className="text-muted-foreground">
                                        {usuario.data.FechaRegistro}
                                    </p>
                                </div>

                                {/* Correo */}
                                <div className="flex items-center gap-4">
                                    <Mail className="h-5 w-5 text-primary" />
                                    <span className="font-semibold">Correo:</span>
                                    <p className="text-muted-foreground">
                                        {usuario.data.Correo}
                                    </p>
                                </div>

                                {usuario.data.idRol ==2 && (
                                    <div>
                                        <div className="flex items-center gap-4 mb-2">
                                            <Hash className="h-5 w-5 text-primary" />
                                            <canspan className="font-semibold">Cantidad de Subastas:</canspan>
                                            <p className="text-muted-foreground">
                                        {usuario.data.CantidadSubastas}
                                    </p>
                                        </div>
                                    </div>
                                )}
                                {usuario.data.idRol == 3 && (
                                    <div>
                                        <div className="flex items-center gap-4 mb-2">
                                            <Hash className="h-5 w-5 text-primary" />
                                            <span className="font-semibold">Cantidad de Pujas:</span>
                                            <p className="text-muted-foreground">
                                                {usuario.data.CantidadPujas}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <Button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 bg-accent text-white hover:bg-accent/90 mt-6" 
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Regresar
                    </Button>
        </div>

    );
}