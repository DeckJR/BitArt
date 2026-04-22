import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';

import SubastaService from '../../services/SubastaService';
import ResultadoSubastaService from '../../services/ResultadoSubastaService';
import PagoService from '../../services/PagoService';

import { ErrorAlert } from "../ui/custom/ErrorAlert";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";

import {
    ArrowLeft,
    Banknote,
    CheckCircle2,
    Loader2,
    AlertCircle
} from "lucide-react";

import { LoadingGrid } from '../ui/custom/LoadingGrid';
import { EmptyState } from '../ui/custom/EmptyState';

const COMISION = 0.05;

/* =========================
   Yup validation schemas
   ========================= */
const tarjetaSchema = Yup.object({
    numeroTarjeta: Yup.string()
        .required('Número de tarjeta requerido')
        .matches(/^\d{16}$/, 'La tarjeta debe tener 16 dígitos'),
    cvv: Yup.string()
        .required('CVV requerido')
        .matches(/^\d{3,4}$/, 'CVV inválido'),
});

const sinpeSchema = Yup.object({
    sinpeNumero: Yup.string()
        .required('Número SINPE requerido')
        .matches(/^\d{8,20}$/, 'Número SINPE inválido'),
});

export function PagoSubasta() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useUser();

    const [subasta, setSubasta] = useState(null);
    const [resultado, setResultado] = useState(null);
    const [pagoExistente, setPagoExistente] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [metodoPago, setMetodoPago] = useState('');
    const [numeroTarjeta, setNumeroTarjeta] = useState('');
    const [cvv, setCvv] = useState('');
    const [sinpeNumero, setSinpeNumero] = useState('');

    const [pagoLoading, setPagoLoading] = useState(false);
    const [pagoError, setPagoError] = useState(null);
    const [pagoExito, setPagoExito] = useState(false);

    const formatCRC = (val) =>
        new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(val);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                setLoading(true);
                setError(null);
                setResultado(null);
                setPagoExistente(null);

                const subRes = await SubastaService.getSubastaById(id);
                if (!subRes.data?.success) {
                    setError(subRes.data?.message ?? 'Error al cargar la subasta.');
                    return;
                }

                const subastaData = subRes.data.data;
                setSubasta(subastaData);

                const resRes = await ResultadoSubastaService.getResultadoBySubasta(subastaData.idSubasta);
                const resultadoReal = resRes.data?.data?.data;
                if (resRes.data?.data?.success === true && resultadoReal) {
                    setResultado(resultadoReal);
                }

                const pagoRes = await PagoService.getPagoBySubasta(subastaData.idSubasta);
                const pagoReal = pagoRes.data?.data?.data;
                if (pagoRes.data?.data?.success === true && pagoReal) {
                    setPagoExistente(pagoReal);
                }

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAll();
    }, [id]);


    const handlePagar = async () => {
        setPagoError(null);

        try {
            if (!metodoPago) {
                throw new Error('Debe seleccionar un método de pago.');
            }

            if (metodoPago === 'tarjeta') {
                await tarjetaSchema.validate(
                    {
                        numeroTarjeta: numeroTarjeta.replace(/\s/g, ''),
                        cvv,
                    },
                    { abortEarly: true }
                );
            }

            if (metodoPago === 'sinpe') {
                await sinpeSchema.validate(
                    { sinpeNumero },
                    { abortEarly: true }
                );
            }

            const montoFinal = parseFloat(resultado.MontoFinal);
            const totalPagar = montoFinal + montoFinal * COMISION;

            setPagoLoading(true);

            await PagoService.createPago({
                idSubasta: subasta.idSubasta,
                idUsuario: user.idUsuario,
                MontoFinal: totalPagar,
                idEstadoPago: 2,
                FechaPago: new Date().toISOString().slice(0, 19).replace('T', ' ')
            });

            setPagoExito(true);

        } catch (err) {
            setPagoError(err.message);
        } finally {
            setPagoLoading(false);
        }
    };

    if (loading) return <LoadingGrid count={1} type="grid" />;
    if (error) return <ErrorAlert title="Error al cargar pago" message={error} />;
    if (!subasta || !resultado) return <EmptyState message="No se encontró información de la subasta." />;

    const montoFinal = parseFloat(resultado.MontoFinal);
    const totalPagar = montoFinal + montoFinal * COMISION;

    if (pagoExistente) {
        return (
            <div className="max-w-lg mx-auto py-12 px-4 text-center space-y-4">
                <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto" />
                <h1 className="text-2xl font-extrabold">Pago ya registrado</h1>
                <Button variant="outline" onClick={() => navigate(-1)} className="gap-2">
                    <ArrowLeft className="w-4 h-4" /> Regresar
                </Button>
            </div>
        );
    }

    if (pagoExito) {
        return (
            <div className="max-w-lg mx-auto py-12 px-4 text-center space-y-4">
                <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto" />
                <h1 className="text-2xl font-extrabold">¡Pago completado!</h1>
                <p className="text-sm">
                    Monto pagado: <strong>{formatCRC(totalPagar)}</strong>
                </p>
                <Button onClick={() => navigate('/')}>Ir al inicio</Button>
            </div>
        );
    }

    return (
        <div className="max-w-lg mx-auto py-12 px-4 space-y-6">

            <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mx-auto">
                    <Banknote className="w-7 h-7 text-primary" />
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight">Realizar pago</h1>
                <p className="text-sm text-muted-foreground">
                    Estás pagando la subasta de <strong>{subasta.objeto?.Nombre}</strong>
                </p>
            </div>

            <Card>
                <CardContent className="p-5 space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Monto base</span>
                        <span>{formatCRC(montoFinal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                            Comisión ({(COMISION * 100).toFixed(0)}%)
                        </span>
                        <span>{formatCRC(montoFinal * COMISION)}</span>
                    </div>
                    <div className="flex justify-between border-t pt-3 text-lg font-bold">
                        <span>Total a pagar</span>
                        <span className="text-green-600">{formatCRC(totalPagar)}</span>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-5 space-y-4">
                    <p className="text-sm font-medium text-center">Método de pago</p>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={() => setMetodoPago('tarjeta')}
                            className={`border rounded-lg p-4 text-sm font-medium ${
                                metodoPago === 'tarjeta'
                                    ? 'border-primary bg-primary/5 text-primary'
                                    : 'border-border text-muted-foreground'
                            }`}
                        >
                            Tarjeta
                        </button>
                        <button
                            onClick={() => setMetodoPago('sinpe')}
                            className={`border rounded-lg p-4 text-sm font-medium ${
                                metodoPago === 'sinpe'
                                    ? 'border-primary bg-primary/5 text-primary'
                                    : 'border-border text-muted-foreground'
                            }`}
                        >
                            SINPE Móvil
                        </button>
                    </div>
                </CardContent>
            </Card>

            {metodoPago === 'tarjeta' && (
                <Card>
                    <CardContent className="p-5 space-y-4">
                        <input
                            type="text"
                            placeholder="Número de tarjeta"
                            value={numeroTarjeta}
                            onChange={(e) => setNumeroTarjeta(e.target.value)}
                            className="w-full border rounded-md px-3 py-2 text-sm"
                        />
                        <input
                            type="password"
                            placeholder="CVV"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            className="w-full border rounded-md px-3 py-2 text-sm"
                        />
                    </CardContent>
                </Card>
            )}

            {metodoPago === 'sinpe' && (
                <Card>
                    <CardContent className="p-5 space-y-4">
                        <input
                            type="text"
                            placeholder="Número SINPE"
                            value={sinpeNumero}
                            onChange={(e) => setSinpeNumero(e.target.value)}
                            className="w-full border rounded-md px-3 py-2 text-sm"
                        />
                        <input
                            type="text"
                            disabled
                            value={formatCRC(totalPagar)}
                            className="w-full border rounded-md px-3 py-2 text-sm bg-muted"
                        />
                    </CardContent>
                </Card>
            )}

            {pagoError && (
                <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 px-3 py-2 rounded">
                    <AlertCircle className="w-4 h-4" />
                    {pagoError}
                </div>
            )}

            <Button onClick={handlePagar} disabled={pagoLoading} className="w-full gap-2">
                {pagoLoading ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Procesando pago...
                    </>
                ) : (
                    <>
                        <Banknote className="w-4 h-4" />
                        Confirmar pago
                    </>
                )}
            </Button>

            <Button variant="outline" onClick={() => navigate(-1)} className="w-full gap-2">
                <ArrowLeft className="w-4 h-4" />
                Regresar
            </Button>
        </div>
    );
}