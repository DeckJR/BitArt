import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

// UI
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

// icons
import { Save, ArrowLeft } from "lucide-react";

// servicios
import SubastaService from "@/services/SubastaService";
import UsuarioService from "@/services/UsuarioService";

// componentes

export function UpdateSubasta() {

    const navigate = useNavigate();
    const { id } = useParams();
    const usuarioLogin = 3;

    const [dataUsuario, setDataUsuario] = useState(null);
    const [dataObjeto, setDataObjeto] = useState(null);
    const [error, setError] = useState("");

    /*** Yup Schema ***/
    const SubastaSchema = yup.object({
        idObjeto: yup.number().required("Debe seleccionar un objeto"),
        precioInicial: yup
        .number()
        .typeError("Debe ser un número")
        .required("Precio requerido")
        .min(1, "Debe ser mayor a 0"),
        incrementoMinimo: yup
        .number()
        .typeError("Debe ser un número")
        .required("Incremento requerido")
        .min(1, "Debe ser mayor a 0"),
        fechaInicioFecha: yup.string().required("Fecha inicio requerida"),
        fechaInicioHora: yup.string().required("Hora inicio requerida"),
        fechaFinFecha: yup.string().required("Fecha fin requerida"),
        fechaFinHora: yup.string().required("Hora fin requerida"),
    });

    /*** React Hook Form ***/
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
        idSubasta: "",
        idObjeto: "",
        precioInicial: "",
        incrementoMinimo: "",
        fechaInicioFecha: "",
        fechaInicioHora: "",
        fechaFinFecha: "",
        fechaFinHora: "",
        idEstadoSubasta: ""
        },
        resolver: yupResolver(SubastaSchema),
    });

    /*** Cargar datos ***/
    useEffect(() => {
        let mounted = true;

        const fetchData = async () => {
        try {

            const subastaRes = await SubastaService.getSubastaById(id);
            const usuarioRes = await UsuarioService.getUsuarioById(usuarioLogin);

            if (!mounted) return;

            const subasta = subastaRes.data.data;

            setDataUsuario(usuarioRes.data.data || null);
            setDataObjeto(subasta.objeto || null);

            // 🔹 Manejo seguro de fechas
            const fechaInicio = (subasta?.FechaHoraInicio || "").split(" ");
            const fechaFin = (subasta?.FechaHoraFinal || "").split(" ");

            reset({
            idSubasta: subasta.idSubasta,
            idObjeto: Number(subasta.idObjeto),
            precioInicial: Number(subasta.PrecioInicial),
            incrementoMinimo: Number(subasta.Incremento),
            fechaInicioFecha: fechaInicio[0] || "",
            fechaInicioHora: fechaInicio[1]?.substring(0, 5) || "",
            fechaFinFecha: fechaFin[0] || "",
            fechaFinHora: fechaFin[1]?.substring(0, 5) || "",
            idEstadoSubasta: subasta.idEstadoSubasta 
            });

        } catch (err) {
            console.error(err);
            setError("Error al cargar datos");
        }
        };

        fetchData();

        return () => {
        mounted = false;
        };

    }, [id, reset]);

    /*** Submit ***/
    const onSubmit = async (dataForm) => {

        try {

        const payload = {
            idSubasta: dataForm.idSubasta,
            idObjeto: dataForm.idObjeto,
            PrecioInicial: dataForm.precioInicial,
            Incremento: dataForm.incrementoMinimo,
            FechaHoraInicio:
            dataForm.fechaInicioFecha + " " + dataForm.fechaInicioHora + ":00",
            FechaHoraFinal:
            dataForm.fechaFinFecha + " " + dataForm.fechaFinHora + ":00",
            idEstadoSubasta: dataForm.idEstadoSubasta,
            idUsuarioVendedor: usuarioLogin,
        };

        const response = await SubastaService.updateSubasta(payload);

        if (response.data?.success) {

            toast.success("Subasta actualizada correctamente", {
            duration: 3000,
            });

            navigate("/subasta/table");

        } else {
            setError(response.data?.message || "Error al actualizar");
        }

        } catch (err) {
        console.error(err);
        setError("Error al actualizar la subasta");
        }
    };

    if (error) return <p className="text-red-600">{error}</p>;

    return (
        <Card className="p-6 max-w-5xl mx-auto">

        <h2 className="text-2xl font-bold mb-6 text-center">
            Actualizar Subasta
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* Objeto */}
            <div>
            <Label>Pintura</Label>
            <Input
                readOnly
                value={
                dataObjeto
                    ? `${dataObjeto.Nombre} - ${dataObjeto.Autor}`
                    : "Cargando..."
                }
            />
            </div>

            {/* Precio e Incremento */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
                <Label>Precio Base</Label>
                <Controller
                name="precioInicial"
                control={control}
                render={({ field }) => <Input {...field} />}
                />
                {errors.precioInicial &&
                <p className="text-sm text-red-500">{errors.precioInicial.message}</p>}
            </div>

            <div>
                <Label>Incremento Mínimo</Label>
                <Controller
                name="incrementoMinimo"
                control={control}
                render={({ field }) => <Input {...field} />}
                />
                {errors.incrementoMinimo &&
                <p className="text-sm text-red-500">{errors.incrementoMinimo.message}</p>}
            </div>

            </div>

            {/* Fechas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
                <Label>Fecha Inicio</Label>
                <Controller
                name="fechaInicioFecha"
                control={control}
                render={({ field }) => <Input {...field} type="date" />}
                />
            </div>

            <div>
                <Label>Hora Inicio</Label>
                <Controller
                name="fechaInicioHora"
                control={control}
                render={({ field }) => <Input {...field} type="time" />}
                />
            </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
                <Label>Fecha Fin</Label>
                <Controller
                name="fechaFinFecha"
                control={control}
                render={({ field }) => <Input {...field} type="date" />}
                />
            </div>

            <div>
                <Label>Hora Fin</Label>
                <Controller
                name="fechaFinHora"
                control={control}
                render={({ field }) => <Input {...field} type="time" />}
                />
            </div>

            </div>

            {/* Nombre del propietario */}
            <div>
            <Label className="block mb-1 text-sm font-medium" htmlFor="prop-nombre">
                Vendedor
            </Label>
            <Input
                id="prop-nombre"
                readOnly
                value={
                dataUsuario
                    ? dataUsuario.nombreCompleto ||
                    [dataUsuario.firstName, dataUsuario.lastName].filter(Boolean).join(" ") ||
                    ""
                    : "Cargando…"
                }
            />
            </div>

            {/* Botones */}
            <div className="flex justify-between gap-4 mt-6">

            <Button
                type="button"
                className="flex items-center gap-2 bg-accent text-white"
                onClick={() => navigate(-1)}
            >
                <ArrowLeft className="w-4 h-4" />
                Regresar
            </Button>

            <Button
                type="submit"
                className="flex-1 flex items-center gap-2 justify-center"
            >
                <Save className="w-4 h-4" />
                Actualizar Subasta
            </Button>

            </div>

        </form>
        </Card>
    );
}