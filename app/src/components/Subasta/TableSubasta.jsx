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
import {Plus, ArrowLeft, RotateCw, InfoIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { LoadingGrid } from "../ui/custom/LoadingGrid";
import { ErrorAlert } from "../ui/custom/ErrorAlert";
import { EmptyState } from "../ui/custom/EmptyState";
import SubastaService from "@/services/SubastaService";
import { useNavigate } from 'react-router-dom';

// Headers de la tabla
const subastaColumns = [
    { key: "idSubasta", label: "Número de subasta" },
    { key: "nameObject", label: "Pintura" },
    { key: "state", label: "Estado" },
    { key: "actions", label: "Acciones" },
];

export default function TableUsuario() {
    const navigate = useNavigate();
    const [subasta, setSubasta] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await SubastaService.getAllSubasta();
            //console.log(response)
            const result = response.data;
            //console.log(result.data)
            if (result.success) {
                setSubasta(result.data || []);
                console.log(subasta)
            } else {
                setError(result.message || "Error desconocido");
            }
        } catch (err) {
            setError(err.message || "Error al conectar con el servidor");
        } finally {
            setLoading(false);
        }
        };
        fetchData()
    }, []);


    if (loading) return <LoadingGrid type="grid" />; 
    if (error) return <ErrorAlert title="Error al cargar subastas" message={error} />; 
    if (subasta?.length === 0) 
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
                            {/* ()=>{} */}
                            {/* ()=>() */}
                            {subastaColumns.map((col)=>( 
                                <TableHead key={col.key}  className="text-left font-semibold">
                                    {col.label}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {subasta?.map((subasta)=>( 
                            <TableRow key = {subasta.idSubasta}>
                                <TableCell > {subasta.idSubasta} </TableCell>
                                <TableCell> {subasta.objeto.Nombre} </TableCell>
                                <TableCell> {subasta.estadosubasta} </TableCell>
                                <TableCell className="flex justify-start items-center gap-1">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button variant="ghost" size="icon" >
                                                    <Link to={`/subasta/detalle/${subasta.idSubasta}`}>
                                                        <InfoIcon className="h-4 w-4 text-primary" />
                                                    </Link>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>Detalle</TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button variant="ghost" size="icon" >
                                                    <Link to={`/subasta/update/${subasta.idSubasta}`}>
                                                        <RotateCw className="h-4 w-4 text-destructive" />                                                    
                                                    </Link>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>Actualizar</TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </TableCell>
                            </TableRow>
                        ))}
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
