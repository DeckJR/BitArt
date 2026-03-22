import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// shadcn/ui
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

// icons
import { Save, ArrowLeft } from "lucide-react";

// servicios
import SubastaService from "@/services/SubastaService";
import ObjetoService from "@/services/ObjetoService";
import UsuarioService from "@/services/UsuarioService";

// componentes reutilizables
import { CustomSelect } from "../ui/custom/custom-select";

export function CreateSubasta() {
  const navigate = useNavigate();
  const usuarioLogin = 3; // usuario vendedor simulado

  const [dataUsuario, setDataUsuario] = useState(null);
  const [dataObjetos, setDataObjetos] = useState([]);
  const [error, setError] = useState("");

  /*** Esquema de validación Yup ***/
const SubastaSchema = yup.object({
  idObjeto: yup
    .number()
    .required("Debe seleccionar un objeto")
    .positive("Objeto inválido"),

  precioInicial: yup
    .number()
    .required("El precio inicial es requerido")
    .min(0.01, "El precio debe ser mayor a 0"),

  incrementoMinimo: yup
    .number()
    .required("El incremento mínimo es requerido")
    .min(0.01, "El incremento mínimo debe ser mayor a 0"),

  fechaInicioFecha: yup.string().required("La fecha de inicio es requerida"),
  fechaInicioHora: yup.string().required("La hora de inicio es requerida"),

  fechaFinFecha: yup.string().required("La fecha de fin es requerida"),
  fechaFinHora: yup.string().required("La hora de fin es requerida"),
}).test(
  "fechaFinMayor",
  "La fecha y hora de fin debe ser posterior a la de inicio",
  (values) => {
    const { fechaInicioFecha, fechaInicioHora, fechaFinFecha, fechaFinHora } = values;

    if (!fechaInicioFecha || !fechaInicioHora || !fechaFinFecha || !fechaFinHora) {
      return true; // validación individual se encarga de los campos vacíos
    }

    // Creamos objetos Date para comparar
    const inicio = new Date(`${fechaInicioFecha}T${fechaInicioHora}`);
    const fin = new Date(`${fechaFinFecha}T${fechaFinHora}`);

    return fin > inicio;
  }
);

  /*** React Hook Form ***/
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      idObjeto: "",
      precioInicial: "",
      incrementoMinimo: "",
      fechaInicioFecha: "",
      fechaInicioHora: "",
      fechaFinFecha: "",
      fechaFinHora: "",
    },
    resolver: yupResolver(SubastaSchema),
  });



  /*** Cargar usuario y objetos activos del usuario ***/
 useEffect(() => {
  const fetchData = async () => {
    try {
      const usuarioRes = await UsuarioService.getUsuarioById(usuarioLogin);
      const objetosRes = await ObjetoService.getObjetoByUsuario(usuarioLogin);

      const objetos = objetosRes.data.data || [];

      // Filtramos solo los objetos activos y que no tengan subasta activa
      const objetosDisponibles = objetos.filter(obj => obj.estado === "Activo" && 
        (!obj.subasta || obj.subasta.every(s => s.idEstadoSubasta !== "3"))
      );

      setDataUsuario(usuarioRes.data.data || []);
      setDataObjetos(objetosDisponibles);

      console.log("Objetos disponibles:", objetosDisponibles);
    } catch (err) {
      console.error(err);
      setError("Error al cargar datos");
    }
  };
  fetchData();
}, []);



  /*** Submit ***/
  const onSubmit = async (dataForm) => {
 try {
    dataForm.idUsuarioVendedor = usuarioLogin;

    dataForm.fechaInicio =
      dataForm.fechaInicioFecha + " " + dataForm.fechaInicioHora + ":00";

    dataForm.fechaFin =
      dataForm.fechaFinFecha + " " + dataForm.fechaFinHora + ":00";

    const response = await SubastaService.createSubasta(dataForm);

    if (response.data?.success) {
      toast.success("Subasta creada correctamente", { duration: 3000 });
      navigate("/subasta/table");
    } else {
      setError(response.data?.message || "Error al crear la subasta");
    }
  } catch (err) {
    console.error(err);
    setError("Error al crear la subasta: " + err.message);
  }
  };

  if (error) return <p className="text-red-600">{error}</p>;





  return (
    <Card className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Crear Subasta</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Seleccionar Objeto */}
        <div>
          <Label className="block mb-1 text-sm font-medium">Pintura</Label>
          <Controller
            name="idObjeto"
            control={control}
            render={({ field }) => (
              <CustomSelect
                field={field}
                data={dataObjetos}
                label=" una pintura"
                getOptionLabel={(obj) => obj.Nombre}
                getOptionValue={(obj) => obj.idObjeto}
                error={errors.idObjeto?.message}
              />
            )}
          />
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Precio Inicial */}
        <div>
          <Label className="block mb-1 text-sm font-medium" htmlFor="precioInicial">
            Precio Base
          </Label>
          <Controller
            name="precioInicial"
            control={control}
            render={({ field }) => (
              <Input {...field} id="precioInicial" placeholder="Ingrese el precio base" />
            )}
          />
          {errors.precioInicial && (
            <p className="text-sm text-red-500">{errors.precioInicial.message}</p>
          )}
        </div>

        {/* Incremento Mínimo */}
        <div>
          <Label className="block mb-1 text-sm font-medium" htmlFor="incrementoMinimo">
            Incremento Mínimo
          </Label>
          <Controller
            name="incrementoMinimo"
            control={control}
            render={({ field }) => (
              <Input {...field} id="incrementoMinimo" placeholder="Ingrese el incremento mínimo" />
            )}
          />
          {errors.incrementoMinimo && (
            <p className="text-sm text-red-500">{errors.incrementoMinimo.message}</p>
          )}
        </div>
          </div>
        {/* Fecha de Inicio */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
  <Label className="block mb-1 text-sm font-medium">
    Fecha de Inicio
  </Label>

  <Controller
    name="fechaInicioFecha"
    control={control}
    render={({ field }) => <Input {...field} type="date" />}
  />

 </div>
 <div>
 <Label className="block mb-1 text-sm font-medium">
    Hora de Inicio
  </Label>
  
  <Controller
    name="fechaInicioHora"
    control={control}
    render={({ field }) => <Input {...field} type="time" />}
  />

  {errors.fechaInicioFecha && (
    <p className="text-sm text-red-500">{errors.fechaInicioFecha.message}</p>
  )}
  {errors.fechaInicioHora && (
    <p className="text-sm text-red-500">{errors.fechaInicioHora.message}</p>
  )}
</div>
</div>




        {/* Fecha de Fin */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
  <Label className="block mb-1 text-sm font-medium">
    Fecha de Cierre
  </Label>

  <Controller
    name="fechaFinFecha"
    control={control}
    render={({ field }) => <Input {...field} type="date" />}
  />
  </div>

  <div>
 <Label className="block mb-1 text-sm font-medium">
    Hora de Cierre
  </Label>
  <Controller
    name="fechaFinHora"
    control={control}
    render={({ field }) => <Input {...field} type="time" />}
  />

  {errors.fechaFinFecha && (
    <p className="text-sm text-red-500">{errors.fechaFinFecha.message}</p>
  )}
  {errors.fechaFinHora && (
    <p className="text-sm text-red-500">{errors.fechaFinHora.message}</p>
  )}
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

        <p className="text-xs text-muted-foreground mt-1">
          El vendedor es asignado automáticamente en el login.
        </p>

        {/* Botones */}
        <div className="flex justify-between gap-4 mt-6">
          <Button
            type="button"
            variant="default"
            className="flex items-center gap-2 bg-accent text-white"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4" />
            Regresar
          </Button>

          <Button type="submit" className="flex-1 flex items-center gap-2 justify-center">
            <Save className="w-4 h-4" />
            Crear Subasta
          </Button>
        </div>
      </form>
    </Card>
  );
}