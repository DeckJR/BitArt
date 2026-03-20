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
import UsuarioService from "@/services/UsuarioService";
import { useNavigate } from 'react-router-dom';

// Headers de la tabla
const usuarioColumns = [
    { key: "name", label: "Nombre" },
    { key: "rol", label: "Rol" },
    { key: "state", label: "Estado" },
    { key: "actions", label: "Acciones" },
];

export default function TableUsuario() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await UsuarioService.getAllUsuario();
            //console.log(response)
            const result = response.data;
            //console.log(result.data)
            if (result.success) {
                setUsuario(result.data || []);
                console.log(usuario)
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
    if (error) return <ErrorAlert title="Error al cargar usuarios" message={error} />; 
    if (usuario?.length === 0) 
    return <EmptyState message="No se encontraron usuarios." />;  

    return (
        <div className="container mx-auto py-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold tracking-tight">
                    Listado de Usuarios
                </h1>
                {/* Modificar cuando hagamos el create del usurio*/}
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button asChild variant="outline" size="icon" className="text-primary">
                                <Link to="/usuario/create">
                                    <Plus className="h-4 w-4" />
                                </Link>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Crear Usuario</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader className="bg-primary/50">
                        <TableRow>
                            {/* ()=>{} */}
                            {/* ()=>() */}
                            {usuarioColumns.map((col)=>( 
                                <TableHead key={col.key}  className="text-left font-semibold">
                                    {col.label}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {usuario?.map((usuario)=>( 
                            <TableRow key = {usuario.idUsuario}>
                                <TableCell > {usuario.nombreCompleto} </TableCell>
                                <TableCell> {usuario.rol} </TableCell>
                                <TableCell> {usuario.estado} </TableCell>
                                <TableCell className="flex justify-start items-center gap-1">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button variant="ghost" size="icon" >
                                                    <Link to={`/usuario/detalle/${usuario.idUsuario}`}>
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
                                                    <Link to={`/usuario/update/${usuario.idUsuario}`}>
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
