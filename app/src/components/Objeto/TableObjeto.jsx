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
import toast from "react-hot-toast";
import { Plus, ArrowLeft, RotateCw, InfoIcon, BookOpen} from "lucide-react";
import ObjetoService from "@/services/ObjetoService";
import { useEffect, useState } from "react";
import { LoadingGrid } from "../ui/custom/LoadingGrid";
import { ErrorAlert } from "../ui/custom/ErrorAlert";
import { EmptyState } from "../ui/custom/EmptyState";
import { useNavigate } from 'react-router-dom';
import { useUser } from "@/hooks/useUser";

// Headers de la tabla
const objetoColumns = [

    { key: "image", label: "Imagen" },
    { key: "name", label: "Nombre" },
    { key: "Condition", label: "Condición" },
    { key: "state", label: "Estado" },
    { key: "actions", label: "Acciones" },  
];

export default function TableObjeto() {
   // const {isVendedor} = useUser();
    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_BASE_URL + 'uploads';
    const [objeto, setObjeto] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useUser();

    const objetosFiltrados =
     user?.rol === "Administrador"
    ? objeto
    : objeto.filter(o => o.idUsuario == user?.idUsuario);


    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await ObjetoService.getAllObjeto();
            //console.log(response)
            const result = response.data;
            //console.log(result.data)
            if (result.success) {
                setObjeto(result.data || []);
                console.log(objeto)
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
    if (error) return <ErrorAlert title="Error al cargar pinturas" message={error} />; 
    if (objeto?.length === 0) 
    return <EmptyState message="No se encontraron pinturas." />;  

    return (
        <div className="container mx-auto py-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold tracking-tight">
                    Listado de Pinturas
                </h1>
                    {/* comentado la validacion futura*/}
                <TooltipProvider>
            {/* {isVendedor() && (*/}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button asChild variant="outline" size="icon" className="text-primary">
                                <Link to="/objeto/create">
                                    <Plus className="h-4 w-4" />
                                </Link>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Crear Pintura</TooltipContent>
                    </Tooltip>
            {/*} )}*/}
                </TooltipProvider>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader className="bg-primary/50">
                        <TableRow>
                            {/* ()=>{} */}
                            {/* ()=>() */}
                            {objetoColumns.map((col)=>( 
                                <TableHead key={col.key}  className="text-left font-semibold">
                                    {col.label}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                            <TableBody>                          
                                {objetosFiltrados?.map((objeto) => (                                <TableRow key={objeto.idObjeto}>
                                <TableCell className="font-">
                                {objeto.imagen ? (
                                    <img
                                    src={`${BASE_URL}/${objeto.imagen}`}
                                    alt={objeto.Nombre || 'Imagen'}
                                    className="h-12 w-12 object-cover rounded-md"
                                    loading="lazy"
                                    />
                                ) : (
                                    <span className="text-muted-foreground text-sm">Sin imagen</span>
                                )}
                                </TableCell>
                                <TableCell className="font-medium"> {objeto.Nombre} </TableCell>
                                <TableCell className="font-medium"> {objeto.condicion} </TableCell>
                                <TableCell className="font-medium"> {objeto.estado} </TableCell>
                                <TableCell className="flex justify-start items-center gap-1">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button variant="ghost" size="icon" >
                                                    <Link to={`/objeto/detalle/${objeto.idObjeto}`}>
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
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    disabled={objeto.subastaActiva || Number(objeto.idEstado) == 2}
                                                    onClick={() => {
                                                        navigate(`/objeto/update/${objeto.idObjeto}`);
                                                    }}
                                                    >
                                                    <RotateCw
                                                        className={`h-4 w-4 ${
                                                        objeto.subastaActiva || Number(objeto.idEstado) == 2
                                                            ? "text-gray-400"
                                                            : "text-destructive"
                                                        }`}
                                                    />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                {objeto.subastaActiva
                                                    ? "No se puede actualizar: subasta activa"
                                                    : "Actualizar"}
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button variant="ghost" size="icon" >
                                                    <Link to={`/subasta/objeto/${objeto.idObjeto}`} 
                                                    state={{ objetoNombre: objeto.Nombre }}>
                                                        <BookOpen className="h-4 w-4 text-primary" />
                                                    </Link>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>Subastas del Objeto</TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                        <Button
                                            className="w-24 text-center"
                                            variant={objeto.idEstado == 1 ? "destructive" : "outline"}
                                            size="icon"
                                            disabled={objeto.subastaActiva}
                                            onClick={async () => {
                                            try {
                                                const nuevoIdEstado = objeto.idEstado == 1 ? 2 : 1;

                                                const objetoActualizar = {
                                                idObjeto: objeto.idObjeto,
                                                Nombre: objeto.Nombre,
                                                Descripcion: objeto.Descripcion,
                                                Autor: objeto.Autor,
                                                idCondicion: objeto.idCondicion,
                                                idEstado: nuevoIdEstado,
                                                categorias: objeto.categorias.map(c => c.idCategoria) 
                                                };

                                                await ObjetoService.updateObjeto(objetoActualizar);

                                                setObjeto((prev) =>
                                                prev.map((o) =>
                                                    o.idObjeto === objeto.idObjeto
                                                    ? {
                                                        ...o,
                                                        idEstado: nuevoIdEstado,
                                                        estado: nuevoIdEstado === 1 ? "Activo" : "Inactivo"
                                                        }
                                                    : o
                                                )
                                                );

                                                toast.success("Estado actualizado");

                                            } catch (err) {
                                                console.error(err);
                                                toast.error("Error al actualizar estado");
                                            }
                                            }}
                                        >
                                            {objeto.idEstado == 1 ? "Desactivar" : "Activar"}
                                        </Button>
                                        </TooltipTrigger>

                                        <TooltipContent>
                                        {objeto.subastaActiva
                                            ? "No se puede cambiar: subasta activa"
                                            : `Estado actual: ${objeto.estado}`}
                                        </TooltipContent>
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
