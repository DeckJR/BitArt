import {Table,TableHeader,TableBody,TableRow,TableHead,TableCell,} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {ArrowLeft} from "lucide-react";
import PujaService from "@/services/PujaService";
import { useEffect, useState } from "react";
import { LoadingGrid } from "../ui/custom/LoadingGrid";
import { ErrorAlert } from "../ui/custom/ErrorAlert";
import { EmptyState } from "../ui/custom/EmptyState";
import {useParams, useNavigate, useLocation } from 'react-router-dom';

// Headers de la tabla
const pujaColumns = [

    { key: "user", label: "Usuario" },
    { key: "amountOffered", label: "Monto Ofertado" },
    { key: "date", label: "Fecha y Hora" },


];

export default function TablePuja() {    
    const navigate = useNavigate();
    const { id } = useParams();
    const [puja, setPuja] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const objetoNombreFromState = location.state?.objetoNombre ?? null;
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await PujaService.getPujasBySubasta(id);
            //console.log(response)
            const result = response.data;
            //console.log(result.data)
            if (result.success) {
                setPuja(result.data || []);
                console.log(puja)
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
    if (error) return <ErrorAlert title="Error al cargar pujas" message={error} />; 
    if (puja?.length === 0) 
    return <EmptyState message="No se encontraron pujas." />;  

    return (
        <div className="container mx-auto py-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold tracking-tight">
                    {objetoNombreFromState ? `Listado de pujas de la subasta de la pintura: ${objetoNombreFromState}` : 'Listado de Pujas'}
                </h1>                
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader className="bg-primary/50">
                        <TableRow>
                            {/* ()=>{} */}
                            {/* ()=>() */}
                            {pujaColumns.map((col)=>( 
                                <TableHead key={col.key}  className="text-left font-semibold">
                                    {col.label}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                            <TableBody>                          
                            {puja?.map((puja) => (
                            <TableRow key={puja.idPuja}>
                                <TableCell > {puja.usuario} </TableCell>
                                <TableCell > {puja.MontoOfertado} </TableCell>
                                <TableCell > {puja.FechaHora} </TableCell>                                
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
