import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SubastaService from '../../services/SubastaService';
import PujaService from '../../services/PujaService';
import ResultadoSubastaService from '../../services/ResultadoSubastaService';
import PagoService from '../../services/PagoService';
import { ErrorAlert } from "../ui/custom/ErrorAlert";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";
import { ArrowLeft, Trophy, Banknote, Clock, CheckCircle2 } from "lucide-react";
import { LoadingGrid } from '../ui/custom/LoadingGrid';
import { EmptyState } from '../ui/custom/EmptyState';

export function DetailResultadoSubasta() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useUser();

    const [subasta, setSubasta] = useState(null);
    const [resultado, setResultado] = useState(null);
    const [ganador, setGanador] = useState(null);
    const [yaPagado, setYaPagado] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const formatCRC = (val) =>
        new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(val);

    const getInitials = (nombre) =>
        nombre?.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase() ?? '?';

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const subRes = await SubastaService.getSubastaById(id);
                if (!subRes.data?.success) {
                    setError(subRes.data?.message ?? 'Error al cargar la subasta.');
                    return;
                }
                setSubasta(subRes.data.data);

                const resRes = await ResultadoSubastaService.getResultadoBySubasta(id);
                if (resRes.data?.success && resRes.data?.data) {
                    setResultado(resRes.data.data);
                }

                const pujaRes = await PujaService.getPujasBySubasta(id);
                const pujas = pujaRes.data?.data?.data ?? [];
                if (pujas.length > 0) setGanador(pujas[0]);

                try {
                    const pagoRes = await PagoService.getPagoBySubasta(id);
                    if (pagoRes.data?.success && pagoRes.data?.data) setYaPagado(true);
                } catch { /* no hay pago aún */ }

            } catch (err) {
                if (err.name !== 'AbortError') setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchAll();
    }, [id]);

    if (loading) return <LoadingGrid count={1} type="grid" />;
    if (error) return <ErrorAlert title="Error al cargar resultado" message={error} />;

    const esCancelada = subasta?.idEstadoSubasta === 1;
    const esFinalizada = subasta?.idEstadoSubasta === 4;

    if (esCancelada) {
        return (
            <EmptyState message="La subasta fue cancelada porque nadie realizó pujas.">
                <Button onClick={() => navigate(`/subasta/reactivar/${id}`)}>
                    Reactivar subasta
                </Button>
            </EmptyState>
        );
    }

    if (esFinalizada && !resultado) {
        return <EmptyState message="Procesando resultado de la subasta..." />;
    }

    if (!subasta || !ganador) return <EmptyState message="No se encontró resultado para esta subasta." />;

    const montoFinal = parseFloat(resultado?.MontoFinal ?? ganador?.MontoOfertado ?? 0);
    const esGanador = user?.idUsuario === (resultado?.idUsuario ?? ganador?.idUsuario);

    return (
        <div className="max-w-2xl mx-auto py-12 px-4">

            {/* Header */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950/40 mb-4">
                    <Trophy className="w-8 h-8 text-amber-500" />
                </div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                    Subasta finalizada
                </p>
                <h1 className="text-3xl font-extrabold tracking-tight">
                    {subasta.objeto?.Nombre ?? 'Resultado de subasta'}
                </h1>
            </div>

            {/* Tarjeta ganador */}
            <Card className="mb-6 border-amber-200 dark:border-amber-800/50">
                <CardContent className="p-6 space-y-5">
                    <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-0 gap-1">
                        <Trophy className="w-3 h-3" /> Ganador
                    </Badge>

                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                            {getInitials(ganador.usuario)}
                        </div>
                        <div>
                            <p className="font-semibold text-base">{ganador.usuario}</p>
                            {ganador.correo && (
                                <p className="text-sm text-muted-foreground">{ganador.correo}</p>
                            )}
                        </div>
                        {esGanador && (
                            <Badge className="ml-auto bg-green-100 text-green-800 dark:bg-green-950/40 dark:text-green-300 border-0">
                                Eres el ganador
                            </Badge>
                        )}
                    </div>

                    <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/40 p-4 text-center">
                        <p className="text-xs text-green-700 dark:text-green-400 mb-1">Monto de puja ganadora</p>
                        <p className="text-3xl font-extrabold text-green-700 dark:text-green-400">
                            {formatCRC(montoFinal)}
                        </p>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>Cierre de la subasta: <strong className="text-foreground">{subasta.FechaHoraFinal}</strong></span>
                    </div>
                </CardContent>
            </Card>

            {/* Botón pago o mensaje según rol y estado */}
            {esGanador ? (
                yaPagado ? (
                    <div className="flex items-center justify-center gap-2 text-sm text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/40 rounded-lg px-4 py-3 mb-6">
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                        Tu pago ya fue registrado exitosamente.
                    </div>
                ) : (
                    <>
                        <Button
                            onClick={() => navigate(`/subasta/pago/${id}`)}
                            className="w-full gap-2 mb-4"
                        >
                            <Banknote className="w-4 h-4" /> Proceder al pago
                        </Button>
                        <p className="text-xs text-center text-muted-foreground mb-6">
                            Tenés 48 horas para completar el pago o la subasta pasará al siguiente postor.
                        </p>
                    </>
                )
            ) : (
                <p className="text-xs text-center text-muted-foreground mb-6">
                    Solo el ganador puede realizar el pago.
                </p>
            )}

            <Button variant="outline" onClick={() => navigate(-1)} className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> Regresar
            </Button>
        </div>
    );
}