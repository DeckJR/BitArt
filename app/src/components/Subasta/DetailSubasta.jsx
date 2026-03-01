import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SubastaService from '../../services/SubastaService';
import { ErrorAlert } from "../ui/custom/ErrorAlert";
// Shadcn UI Components
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Clock,
    Globe,
    User,
    Film,
    Star,
    ChevronRight,
    ArrowLeft
} from "lucide-react";
import { LoadingGrid } from '../ui/custom/LoadingGrid';
import { EmptyState } from '../ui/custom/EmptyState';

export function DetailSubasta() {
    const navigate = useNavigate();
    const { id } = useParams();
    const BASE_URL = import.meta.env.VITE_BASE_URL + 'uploads';
    const [subasta, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await SubastaService.getSubastaById(id);
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
    if (error) return <ErrorAlert title="Error al cargar subastas" message={error} />;   
    if (!subasta || !subasta.data || !subasta.data.objeto) {
    return <EmptyState message="No se encontraron subastas en esta tienda." />
    }

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Sección de la Imagen con año en Badge */}
                <div className="relative flex-shrink-0 w-full md:w-1/4 lg:w-1/5 rounded-lg overflow-hidden shadow-xl">
                    <div className="aspect-[2/3] w-full bg-muted flex items-center justify-center">
                        
                            <img
                                src={`${BASE_URL}/${subasta.data.objeto.imagen}`}
                                alt={`Poster de ${subasta.data.objeto.Nombre}`}
                                className="w-full h-full object-contain"
                            />
                        
                            <Film className="h-1/2 w-1/2 text-muted-foreground" />
                        
                    </div>
                    {/* Badge del año en la esquina inferior derecha */}
                    <Badge variant="secondary" className="absolute bottom-4 right-4 text-1xl">
                        
                    </Badge>
                </div>

                {/* Sección de los Detalles */}
                <div className="flex-1 space-y-6">
                    {/* Título del Objeto */}
                    <div>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                        {subasta.data.objeto.Nombre}

                        </h1>
                    </div>

                    <Card>
                        <CardContent className="p-6 space-y-6">
                            {/* Información de autor, condicion e estadp en una sola fila */}
                            <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
                                <div className="flex items-center gap-4">
                                    <Globe className="h-5 w-5 text-primary" />
                                    <span className="font-semibold">Propietario:</span>
                                    <p className="text-muted-foreground">
                                        {subasta.data.objeto.propietario}
                                    </p>
                                </div>
                                <br/>
                                {/* Autor */}
                                <div className="flex items-center gap-4">
                                    <User className="h-5 w-5 text-primary" />
                                    <span className="font-semibold">Autor:</span>
                                    <p className="text-muted-foreground">
                                    {subasta.data.objeto.Autor}
                                    </p>
                                </div>
                                {/* Condición */}
                                <div className="flex items-center gap-4">
                                    <Star className="h-5 w-5 text-primary" />
                                    <span className="font-semibold">Condición:</span>
                                    <p className="text-muted-foreground">
                                        {subasta.data.objeto.condicion}
                                    </p>
                                </div>
                                {/* Estado */}
                                <div className="flex items-center gap-4">
                                    <Globe className="h-5 w-5 text-primary" />
                                    <span className="font-semibold">Estado:</span>
                                    <p className="text-muted-foreground">
                                        {subasta.data.estadosubasta}
                                    </p>
                                </div>
                                
                            </div>

                            {/* Contenedor de dos columnas para categorías y vendedor */}
                            <div className="grid gap-4 md:grid-cols-2">
                            
                                    <div>
                                        <div className="flex items-center gap-4 mb-2">
                                            <Film className="h-5 w-5 text-primary" />
                                            <span className="font-semibold">Categorías:</span>
                                        </div>
                                        <div className="flex flex-col space-y-1">
                                            
                                                {subasta.data.objeto.categorias.map((categoria)=>(
                                                <div key={categoria.idCategoria}  className="flex items-center gap-2 py-1 px-2 text-sm">
                                                    <ChevronRight className="h-4 w-4 text-secondary" />
                                                    <span className="text-muted-foreground">
                                                        {categoria.Descripcion}
                                                    </span>
                                                </div>
                                            ))}
                                            
                                        </div>
                                    </div>
                                    <div>
                                    <div className="flex items-center gap-4 mb-2">
                                        <Clock className="h-5 w-5 text-primary" />
                                        <span className="font-semibold">Fechas:</span>
                                    </div>

                                    <div className="flex flex-col space-y-1">
                                        {subasta.data.FechaHoraInicio && subasta.data.FechaHoraInicio.length > 0 && (
                                        <div className="flex items-center gap-2 py-1 px-2 text-sm">
                                            <Clock className="h-4 w-4 text-secondary" />
                                            <span className="text-muted-foreground">
                                            <b>Fecha Inicio:</b></span>
                                            <p className="text-muted-foreground">
                                            {subasta.data.FechaHoraInicio}
                                            </p>

                                        </div>
                                        )}

                                        {subasta.data.FechaHoraFinal && subasta.data.FechaHoraFinal.length > 0 && (
                                        <div className="flex items-center gap-2 py-1 px-2 text-sm">
                                            <Clock className="h-4 w-4 text-secondary" />
                                            <span className="text-muted-foreground">
                                            <b>Fecha Final:</b></span>
                                            <p className="text-muted-foreground">
                                            {subasta.data.FechaHoraFinal}
                                            </p>
                                        </div>
                                        )}
                                    </div>
                                    </div>

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