import { useEffect, useState, useRef } from 'react'; // ✅ useRef agregado
import { useNavigate, useParams } from 'react-router-dom';
import SubastaService from '../../services/SubastaService';
import PujaService from '../../services/PujaService';
import { ErrorAlert } from "../ui/custom/ErrorAlert";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";
import {
    UserRoundPen, Clock, User, List, FileLock, FileClock,
    ChevronRight, Banknote, BanknoteArrowUp, Hash, ArrowLeft, Trophy
} from "lucide-react";
import { LoadingGrid } from '../ui/custom/LoadingGrid';
import { EmptyState } from '../ui/custom/EmptyState';
import { useAblyChannel } from '@/hooks/useAbly';

export function InterfaceSubasta() {
    const navigate = useNavigate();
    const { id } = useParams();
    const BASE_URL = import.meta.env.VITE_BASE_URL + 'uploads';
    const { user } = useUser();
    const [subasta, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [pujas, setPujas] = useState([]);
    const [monto, setMonto] = useState('');
    const [pujaLoading, setPujaLoading] = useState(false);
    const [pujaError, setPujaError] = useState(null);
    const [pujaExito, setPujaExito] = useState(false);
    const [pujasSuperada, setPujasSuperada] = useState(false);

    
    const subastaRef = useRef(null);
    const userRef= useRef(null);

    useEffect(() => {
        userRef.current = subasta;
    }, [user]);

    useEffect(() => {
        subastaRef.current = subasta;
    }, [subasta]);

    // Si la subasta ya está Finalizada al cargar, redirigir de una vez
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await SubastaService.getSubastaById(id);
                setData(response.data);

                if (!response.data.success) {
                    setError(response.data.message);
                    return;
                }

                /*if (response.data?.data?.estadosubasta === 'Finalizada') {
                    navigate(`/subasta/resultado/${id}`);
                    return;
                }*/

            } catch (err) {
                if (err.name !== "AbortError") setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData(id);
    }, [id]);

    const fetchPujas = async () => {
        try {
            const res = await PujaService.getPujasBySubasta(id);
            setPujas(res.data?.data?.data ?? []);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        fetchPujas();
    }, [id]);

    // Ably escucha nueva puja
    useAblyChannel(
        id ? `subasta-${id}` : null,
        'nueva-puja',
        (data) => {
            setPujas(prev => {
                const existe = prev.some(p => String(p.idPuja) === String(data.idPuja));
                if (existe) return prev;

                const usuarioActualId = String(userRef.current?.idUsuario);
                const quienPujoId = String(data.idUsuario);
                const usuarioTeniaPuja = prev.some(p => String(p.idUsuario) === usuarioActualId);

                if (usuarioActualId && quienPujoId !== usuarioActualId && usuarioTeniaPuja) {
                    setPujasSuperada(true);
                    setTimeout(() => setPujasSuperada(false), 5000);
                }

                return [data, ...prev];
            });
        }
    );

    // ✅ Ably escucha cierre de subasta — ahora usa subastaRef para ver el valor actual
    useAblyChannel(
        id ? `subasta-${id}` : null,
        'subasta-cerrada',
        (data) => {
            // Si la subasta no estaba Abierta en esta sesión, ignorar el mensaje
            // Esto evita que mensajes viejos de Ably redirijan al usuario
            if (subastaRef.current?.data?.estadosubasta !== 'Abierta') return;

            setData(prev => {
                if (!prev) return prev;
                return {
                    ...prev,
                    data: {
                        ...prev.data,
                        estadosubasta: 'Finalizada',
                        ganador: data.ganador ?? null,
                        montoFinal: data.montoFinal ?? null,
                    }
                };
            });

            setTimeout(() => {
                navigate(`/subasta/resultado/${id}`);
            }, 2000);
        }
    );
    
    const formatCRC = (val) =>
        new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(val);

    const getInitials = (nombre) =>
        nombre?.split(' ').map(n => n[0]).slice(0, 2).join('') ?? '?';

    const handlePujar = async () => {
        setPujaError(null);
        setPujaExito(false);

        if (!monto || isNaN(monto) || Number(monto) <= 0) {
            setPujaError('Ingresá un monto válido.');
            return;
        }

        const pujaLiderMonto = pujas[0]
            ? parseFloat(pujas[0].MontoOfertado)
            : parseFloat(subasta?.data?.PrecioInicial ?? 0);
        const incremento = parseFloat(subasta?.data?.Incremento ?? 0);
        const minimo = pujaLiderMonto + incremento;

        if (Number(monto) < minimo) {
            setPujaError(`El monto mínimo es ${formatCRC(minimo)}`);
            return;
        }
        if (!user?.idUsuario) {
            setPujaError('Debes iniciar sesión para pujar.');
            return;
        }

        try {
            setPujaLoading(true);
            await PujaService.createPuja({
                idUsuario: user.idUsuario,
                idSubasta: id,
                MontoOfertado: monto,
            });
            setMonto('');
            setPujaExito(true);
            setTimeout(() => setPujaExito(false), 3000);
        } catch (e) {
            setPujaError('Error al registrar la puja.' + e);
        } finally {
            setPujaLoading(false);
        }
    };

    if (loading) return <LoadingGrid count={1} type="grid" />;
    if (error) return <ErrorAlert title="Error al cargar subastas" message={error} />;
    if (!subasta || !subasta.data || !subasta.data.objeto) {
        return <EmptyState message="No se encontraron subastas en esta tienda." />;
    }

    const precioBase = parseFloat(subasta.data.PrecioInicial ?? 0);
    const incremento = parseFloat(subasta.data.Incremento ?? 0);
    const pujaLider = pujas[0] ? parseFloat(pujas[0].MontoOfertado) : null;
    const minimoParaPujar = pujaLider ? pujaLider + incremento : precioBase + incremento;
    const estaActiva = subasta.data.estadosubasta === 'Abierta';

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">

            {pujasSuperada && (
                <div className="mb-4 bg-orange-100 border border-orange-400 text-orange-800 px-4 py-3 rounded-lg text-sm font-medium animate-pulse">
                    ⚠️ Tu puja ha sido superada
                </div>
            )}

            <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="relative flex-shrink-0 w-full md:w-1/4 lg:w-1/5 rounded-lg overflow-hidden shadow-xl">
                    <div className="aspect-[2/3] w-full bg-muted flex items-center justify-center">
                        <img
                            src={`${BASE_URL}/${subasta.data.objeto.imagen}`}
                            alt={`Poster de ${subasta.data.objeto.Nombre}`}
                            className="w-full h-full object-contain"
                        />
                        <List className="h-1/2 w-1/2 text-muted-foreground" />
                    </div>
                    <Badge variant="secondary" className="absolute bottom-4 right-4 text-1xl" />
                </div>

                <div className="flex-1 space-y-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                            {subasta.data.objeto.Nombre}
                        </h1>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                        <Card>
                            <CardContent className="p-6 space-y-6">
                                <h2 className="text-xl font-bold flex items-center gap-2">Información de la obra</h2>
                                <div className="flex items-center gap-4">
                                    <User className="h-5 w-5 text-primary" />
                                    <span className="font-semibold">Autor:</span>
                                    <p className="text-muted-foreground">{subasta.data.objeto.Autor}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <UserRoundPen className="h-5 w-5 text-primary" />
                                    <span className="font-semibold">Propietario:</span>
                                    <p className="text-muted-foreground">{subasta.data.objeto.propietario}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <FileLock className="h-5 w-5 text-primary" />
                                    <span className="font-semibold">Condición:</span>
                                    <p className="text-muted-foreground">{subasta.data.objeto.condicion}</p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-4 mb-2">
                                        <List className="h-5 w-5 text-primary" />
                                        <span className="font-semibold">Categorías:</span>
                                    </div>
                                    <div className="space-y-1">
                                        {subasta.data.objeto.categorias.map((categoria) => (
                                            <div key={categoria.idCategoria} className="flex items-center gap-2 py-1 px-2 text-sm">
                                                <ChevronRight className="h-4 w-4 text-secondary" />
                                                <span className="text-muted-foreground">{categoria.Descripcion}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6 space-y-6">
                                <h2 className="text-xl font-bold flex items-center gap-2">Información de la subasta</h2>
                                <div className="flex items-center gap-4">
                                    <FileClock className="h-5 w-5 text-primary" />
                                    <span className="font-semibold">Estado:</span>
                                    <Badge variant={estaActiva ? 'default' : 'secondary'}>
                                        {subasta.data.estadosubasta}
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Banknote className="h-5 w-5 text-primary" />
                                    <span className="font-semibold">Precio Base:</span>
                                    <p className="text-muted-foreground">{formatCRC(precioBase)}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <BanknoteArrowUp className="h-5 w-5 text-primary" />
                                    <span className="font-semibold">Incremento min:</span>
                                    <p className="text-muted-foreground">{formatCRC(incremento)}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Hash className="h-5 w-5 text-primary" />
                                    <span className="font-semibold">Cantidad de pujas:</span>
                                    <p className="text-muted-foreground">{pujas.length}</p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-4 mb-2">
                                        <Clock className="h-5 w-5 text-primary" />
                                        <span className="font-semibold">Fechas:</span>
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                        <div className="flex items-center gap-2 text-sm">
                                            <Clock className="h-4 w-4 text-secondary" />
                                            <b>Inicio:</b>
                                            <span className="text-muted-foreground">{subasta.data.FechaHoraInicio}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <Clock className="h-4 w-4 text-secondary" />
                                            <b>Final:</b>
                                            <span className="text-muted-foreground">{subasta.data.FechaHoraFinal}</span>
                                        </div>
                                    </div>
                                </div>

                                {subasta.data.estadosubasta === 'Finalizada' && (
                                    <div className={`px-4 py-3 rounded-lg flex items-center gap-2 text-sm font-medium ${
                                        subasta.data.ganador
                                            ? 'bg-green-100 border border-green-400 text-green-800'
                                            : 'bg-gray-100 border border-gray-400 text-gray-700'
                                    }`}>
                                        <Trophy className="h-5 w-5 text-yellow-500" />
                                        {subasta.data.ganador
                                            ? <>Ganador: <strong>{subasta.data.ganador}</strong> — {formatCRC(subasta.data.montoFinal)}</>
                                            : 'Subasta finalizada sin ofertas'
                                        }
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
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

            <div className="border-t mt-10 pt-10">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-7 bg-primary rounded" />
                    <h2 className="text-2xl font-bold">Pujas</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6 items-start">
                    <div className="border rounded-xl overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-muted">
                                <tr>
                                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">#</th>
                                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Usuario</th>
                                    <th className="px-4 py-3 text-right font-medium text-muted-foreground">Monto</th>
                                    <th className="px-4 py-3 text-right font-medium text-muted-foreground">Fecha y hora</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pujas.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                                            No hay pujas registradas aún.
                                        </td>
                                    </tr>
                                ) : (
                                    pujas.map((puja, index) => (
                                        <tr key={puja.idPuja} className={`border-t ${index === 0 ? 'bg-green-50 dark:bg-green-950/20' : ''}`}>
                                            <td className="px-4 py-3 text-muted-foreground">
                                                {index === 0 ? <Trophy className="h-4 w-4 text-yellow-500" /> : pujas.length - index}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    <span className="inline-flex w-7 h-7 rounded-full bg-blue-100 text-blue-800 text-xs font-medium items-center justify-center flex-shrink-0">
                                                        {getInitials(puja.usuario)}
                                                    </span>
                                                    <span>{puja.usuario}</span>
                                                    {index === 0 && <Badge className="text-xs">Líder</Badge>}
                                                </div>
                                            </td>
                                            <td className={`px-4 py-3 text-right font-medium ${index === 0 ? 'text-green-600' : 'text-muted-foreground'}`}>
                                                {formatCRC(puja.MontoOfertado)}
                                            </td>
                                            <td className="px-4 py-3 text-right text-muted-foreground text-xs">
                                                {puja.FechaHora}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="border rounded-xl p-5 flex flex-col gap-4 sticky top-6">
                        <div className="bg-muted rounded-lg p-4">
                            <p className="text-xs text-muted-foreground mb-1">Puja líder actual</p>
                            <p className="text-2xl font-bold text-green-600">
                                {pujaLider ? formatCRC(pujaLider) : formatCRC(precioBase)}
                            </p>
                            {pujas[0] && (
                                <p className="text-xs text-muted-foreground mt-1">{pujas[0].usuario}</p>
                            )}
                        </div>

                        <div className="bg-muted rounded-lg p-4">
                            <p className="text-xs text-muted-foreground mb-1">Mínimo para pujar</p>
                            <p className="text-lg font-semibold">{formatCRC(minimoParaPujar)}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                                {pujaLider ? 'Puja actual + incremento mínimo' : 'Precio base + incremento mínimo'}
                            </p>
                        </div>

                        <div>
                            <label className="text-sm text-muted-foreground block mb-1">Tu oferta (₡)</label>
                            <input
                                type="number"
                                value={monto}
                                onChange={e => setMonto(e.target.value)}
                                placeholder={minimoParaPujar.toString()}
                                className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>

                        {pujaError && (
                            <p className="text-xs text-red-500 bg-red-50 dark:bg-red-950/30 px-3 py-2 rounded-md">
                                {pujaError}
                            </p>
                        )}
                        {pujaExito && (
                            <p className="text-xs text-green-600 bg-green-50 dark:bg-green-950/30 px-3 py-2 rounded-md">
                                ¡Puja registrada exitosamente!
                            </p>
                        )}

                        <Button
                            onClick={handlePujar}
                            disabled={pujaLoading || !estaActiva}
                            className="w-full"
                        >
                            {pujaLoading ? 'Registrando...' : 'Realizar puja'}
                        </Button>

                        {!estaActiva && (
                            <p className="text-xs text-center text-muted-foreground">
                                Esta subasta no está activa.
                            </p>
                        )}

                        <p className="text-xs text-muted-foreground text-center border-t pt-3">
                            Pujando como: <strong>{user?.nombreCompleto ?? user?.Correo}</strong>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}