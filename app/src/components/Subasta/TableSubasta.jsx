import { Link } from "react-router-dom";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Ban, Plus, Send, ArrowLeft, RotateCw, InfoIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { LoadingGrid } from "../ui/custom/LoadingGrid";
import { ErrorAlert } from "../ui/custom/ErrorAlert";
import { EmptyState } from "../ui/custom/EmptyState";
import SubastaService from "@/services/SubastaService";
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";

const subastaColumns = [
    { key: "idSubasta", label: "Número de subasta" },
    { key: "nameObject", label: "Pintura" },
    { key: "state", label: "Estado" },
    { key: "actions", label: "Acciones" },
];

export default function TableSubasta() {
    const navigate = useNavigate();
    const [subasta, setSubasta] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useUser();

   

    const subastasFiltradas =
        user?.rol === "Administrador"
            ? subasta
            : subasta.filter(s => s.objeto?.idUsuario == user?.idUsuario);

    useEffect(() => {
        let isFirstLoad = true;

        const fetchData = async () => {
            try {
                const response = await SubastaService.getAllSubasta();
                const result = response.data;

                if (result.success) {
                    setSubasta(result.data || []);
                } else {
                    setError(result.message || "Error desconocido");
                }
            } catch (err) {
                setError(err.message || "Error al conectar con el servidor");
            } finally {
                if (isFirstLoad) {
                    setLoading(false);
                    isFirstLoad = false;
                }
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 10000);
        return () => clearInterval(interval);
    }, []);

    if (loading) return <LoadingGrid type="grid" />;
    if (error) return <ErrorAlert title="Error al cargar subastas" message={error} />;

    if (subastasFiltradas?.length === 0)
        return <EmptyState message="No se encontraron subastas." />;

    return (
        <div className="container mx-auto py-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold tracking-tight">
                    Listado de Subastas
                </h1>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button asChild variant="outline" size="icon" className="text-primary">
                                <Link to="/subasta/create">
                                    <Plus className="h-4 w-4" />
                                </Link>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Crear Subasta</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader className="bg-primary/50">
                        <TableRow>
                            {subastaColumns.map((col) => (
                                <TableHead key={col.key} className="text-left font-semibold">
                                    {col.label}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {subastasFiltradas?.map((subasta) => {
                            return (
                                <TableRow key={subasta.idSubasta}>
                                    <TableCell>{subasta.idSubasta}</TableCell>
                                    <TableCell>{subasta.objeto.Nombre}</TableCell>
                                    <TableCell>{subasta.estadosubasta}</TableCell>
                                    <TableCell className="flex justify-start items-center gap-1">

                                        {/* Detalle */}
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <Link to={`/subasta/detalle/${subasta.idSubasta}`}>
                                                            <InfoIcon className="h-4 w-4 text-primary" />
                                                        </Link>
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>Detalle</TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>

                                        {/* Actualizar */}
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        disabled={
                                                            Number(subasta.idEstadoSubasta) !== 1 && (
                                                                new Date(subasta.FechaHoraInicio) <= new Date() ||
                                                                Number(subasta.idEstadoSubasta) === 3 ||
                                                                subasta.CantidadPujas > 0
                                                            )
                                                        }
                                                        onClick={() => navigate(`/subasta/update/${subasta.idSubasta}`)}
                                                    >
                                                        <RotateCw className={`h-4 w-4 ${
                                                            Number(subasta.idEstadoSubasta) !== 1 && (
                                                                new Date(subasta.FechaHoraInicio) <= new Date() ||
                                                                Number(subasta.idEstadoSubasta) === 3 ||
                                                                subasta.CantidadPujas > 0
                                                            )
                                                                ? "text-gray-400"
                                                                : "text-destructive"
                                                        }`} />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    {Number(subasta.idEstadoSubasta) !== 1 && (
                                                        new Date(subasta.FechaHoraInicio) <= new Date() ||
                                                        Number(subasta.idEstadoSubasta) === 3 ||
                                                        subasta.CantidadPujas > 0
                                                    )
                                                        ? "No se puede actualizar: subasta iniciada"
                                                        : "Actualizar"}
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>

                                        {/* Publicar */}
                                        <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    disabled={ Number(subasta.idEstadoSubasta) == 1 || Number(subasta.idEstadoSubasta) == 3 ||  Number(subasta.idEstadoSubasta) == 4 }
                                                    onClick={async () => {
                                                        try {
                                                        const ahora = new Date();
                                                        const fechaInicio = new Date(subasta.FechaHoraInicio);
                                                        const nuevoIdEstadoSubasta = fechaInicio <= ahora ? 3 : 2;
                                                        
                                                        const subastaActualizar = {
                                                            idSubasta: subasta.idSubasta,
                                                            idObjeto: subasta.idObjeto,
                                                            PrecioInicial: subasta.PrecioInicial,
                                                            Incremento: subasta.Incremento,
                                                            FechaHoraInicio: subasta.FechaHoraInicio,
                                                            FechaHoraFinal: subasta.FechaHoraFinal,
                                                            idEstadoSubasta: nuevoIdEstadoSubasta
                                                            };
                                                            await SubastaService.updateSubasta(subastaActualizar);
                                                            
                                                            toast.success("Subasta de la pintura " + subasta.objeto.Nombre + " se encuentra:" + (nuevoIdEstadoSubasta==2? "Programada":"Abierta"));

                                                        } catch (err) {
                                                            console.error(err);
                                                            toast.error("Error al programar o al abrir la subasta");
                                                        }
                                                    }}
                                                    >
                                                    <Send
                                                        className={`h-4 w-4 ${
                                                        Number(subasta.idEstadoSubasta) == 1 || Number(subasta.idEstadoSubasta) == 3 ||  Number(subasta.idEstadoSubasta) ==  4
                                                            ? "text-gray-400"
                                                            : "text-destructive"
                                                        }`}
                                                    />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                {subasta.FechaHoraInicio>= Date.now() || Number(subasta.idEstadoSubasta) == 3 || (subasta.CantidadPujas > 0)
                                                    ? "No se puede publicar: subasta activa, cancelada o finalizada"
                                                    : "Publicar"}
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>

                                        {/* Cancelar */}
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        disabled={
                                                            Number(subasta.idEstadoSubasta) === 1 ||
                                                            Number(subasta.idEstadoSubasta) === 4 ||
                                                            subasta.CantidadPujas > 0
                                                        }
                                                        onClick={async () => {
                                                            try {
                                                                const nuevoIdEstadoSubasta = 1;

                                                                await SubastaService.updateSubasta({
                                                                    idSubasta: subasta.idSubasta,
                                                                    idObjeto: subasta.idObjeto,
                                                                    PrecioInicial: subasta.PrecioInicial,
                                                                    Incremento: subasta.Incremento,
                                                                    FechaHoraInicio: subasta.FechaHoraInicio,
                                                                    FechaHoraFinal: subasta.FechaHoraFinal,
                                                                    idEstadoSubasta: nuevoIdEstadoSubasta,
                                                                });

                                                                setSubasta((prev) =>
                                                                    prev.map((x) =>
                                                                        x.idSubasta === subasta.idSubasta
                                                                            ? { ...x, idEstadoSubasta: 1, estadosubasta: "Cancelada" }
                                                                            : x
                                                                    )
                                                                );

                                                                toast.success(`Subasta de ${subasta.objeto.Nombre} cancelada`);
                                                            } catch (err) {
                                                                console.error(err);
                                                                toast.error("Error al cancelar la subasta");
                                                            }
                                                        }}
                                                    >
                                                        <Ban className={`h-4 w-4 ${
                                                            Number(subasta.idEstadoSubasta) === 1 ||
                                                            Number(subasta.idEstadoSubasta) === 4 ||
                                                            subasta.CantidadPujas > 0
                                                                ? "text-gray-400"
                                                                : "text-destructive"
                                                        }`} />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    {Number(subasta.idEstadoSubasta) === 1 ||
                                                    Number(subasta.idEstadoSubasta) === 4 ||
                                                    subasta.CantidadPujas > 0
                                                        ? "No se puede cancelar: subasta abierta o finalizada"
                                                        : "Cancelar"}
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>

                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
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
