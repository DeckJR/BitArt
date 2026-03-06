import {Table,TableHeader,TableBody,TableRow,TableHead,TableCell,} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {ArrowLeft} from "lucide-react";
import SubastaService from "@/services/SubastaService";
import { useEffect, useState } from "react";
import { LoadingGrid } from "../ui/custom/LoadingGrid";
import { ErrorAlert } from "../ui/custom/ErrorAlert";
import { EmptyState } from "../ui/custom/EmptyState";
import {useParams, useNavigate, useLocation } from 'react-router-dom';

// Headers de la tabla
const subastaColumns = [
    { key: "idSubasta", label: "Identificador Subasta" },
    { key: "FechaInicio", label: "Fecha de Inicio" },
    { key: "FechaCierre", label: "Fecha de Cierre" },
    { key: "EstadoSubasta", label: "Estado de Subasta" },
];

export default function TableSubastaByObjeto() {    
    const navigate = useNavigate();
    const { id } = useParams();
    const [subasta, setSubasta] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const objetoNombreFromState = location.state?.objetoNombre ?? null;
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await SubastaService.getSubastaByObjeto(id);
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
    }, [id]);

    if (loading) return <LoadingGrid type="grid" />; 
    if (error) return <ErrorAlert title="Error al cargar subastas" message={error} />; 
    if (subasta?.length === 0) 
    return <EmptyState message="No se encontraron subastas." />;  

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold tracking-tight">
                    {objetoNombreFromState ? `Listado de subastas de la pintura: ${objetoNombreFromState}` : 'Subastas del objeto'}
                </h1>
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
                            {subasta?.map((subasta) => (
                            <TableRow key={subasta.idSubasta}>
                                <TableCell > {subasta.idSubasta} </TableCell>
                                <TableCell > {subasta.FechaHoraInicio} </TableCell>
                                <TableCell > {subasta.FechaHoraFinal} </TableCell> 
                                <TableCell > {subasta.estadosubasta} </TableCell>                               
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
