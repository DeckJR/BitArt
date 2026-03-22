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
import ObjetoService from "../../services/ObjetoService";
import ImagenService from "@/services/ImagenService";
import CategoriaService from "@/services/CategoriaService";
import CondicionService from "@/services/CondicionService";
import UsuarioService from "@/services/UsuarioService";

// componentes
import { CustomMultiSelect } from "../ui/custom/custom-multiple-select";
import { CustomSelect } from "../ui/custom/custom-select";
import EstadoObjetoService from "@/services/EstadoObjetoService";

export function UpdateObjeto() {
  const navigate = useNavigate();
  const { id } = useParams();
  const BASE_URL_image = import.meta.env.VITE_BASE_URL + "uploads";

  const [dataUsuario, setDataUsuario] = useState(null);
  const [dataCategoria, setDataCategoria] = useState([]);
  const [dataCondicion, setDataCondicion] = useState([]);
  const [dataEstado, setDataEstado] = useState([]);
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  const [error, setError] = useState("");


  const ObjetoSchema = yup.object({
    Nombre: yup.string().required("El nombre es requerido").min(3),
    Descripcion: yup.string().required("La descripción es requerida").min(20),
    Autor: yup.string().required("El autor es requerido").min(3),
    idCondicion: yup.number().typeError("Seleccione una condición").required("La condición es requerida"),
    categorias: yup.array().min(1, "Seleccione al menos una categoría"),
    idEstado: yup.number().typeError("Seleccione un estado").required("El estado es requerido"),
  });

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      idObjeto: "",
      Nombre: "",
      Descripcion: "",
      Autor: "",
      idCondicion: "",
      categorias: [],
      idEstado: "",
    },
    resolver: yupResolver(ObjetoSchema),
  });

  const handleChangeImage = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileURL(URL.createObjectURL(selectedFile));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const objetoRes = await ObjetoService.getObjetoById(id);
        const usuarioRes = await UsuarioService.getUsuarioById(objetoRes.data.data.idUsuario);
        const categoriasRes = await CategoriaService.getAllCategoria();
        const condicionRes = await CondicionService.getAllCondicion();
        const estadoRes = await EstadoObjetoService.getAllEstadoObjeto();

        setDataUsuario(usuarioRes.data.data || []);
        setDataCategoria(categoriasRes.data.data || []);
        setDataCondicion(condicionRes.data.data || []);
        setDataEstado(estadoRes.data.data || []);

        if (objetoRes.data) {
          const obj = objetoRes.data.data;

          reset({
            idObjeto: obj.idObjeto,
            Nombre: obj.Nombre,
            Descripcion: obj.Descripcion,
            Autor: obj.Autor,
            idCondicion: obj.idCondicion,
            categorias: obj.categorias.map(c => c.idCategoria),
            idEstado: obj.idEstado
          });

          if (obj.imagen) {
            setFileURL(BASE_URL_image + "/" + obj.imagen);
          }
        }

      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      }
    };

    fetchData();
  }, [BASE_URL_image, id, reset]);

  const onSubmit = async (dataForm) => {
    try {
      const isValid = await ObjetoSchema.isValid(dataForm);
      if (!isValid) return;

      const response = await ObjetoService.updateObjeto(dataForm);

      if (response.data) {
        if (file) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("idObjeto", response.data.data.idObjeto);
          await ImagenService.createImagen(formData);
        }

        toast.success(
          `Objeto actualizado ${response.data.data.idObjeto} - ${response.data.data.Nombre}`,
          { duration: 3000 }
        );

        navigate("/objeto/table");

      } else if (response.error) {
        setError(response.error);
      }

    } catch (err) {
      console.error(err);
      setError("Error al actualizar objeto");
    }
  };

  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <Card className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Actualizar Pintura</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Nombre */}
        <div>
          <Label className="block mb-1 text-sm font-medium">Nombre</Label>
          <Controller
            name="Nombre"
            control={control}
            render={({ field }) => <Input {...field} placeholder="Ingrese el nombre" />}
          />
          {errors.Nombre && <p className="text-sm text-red-500">{errors.Nombre.message}</p>}
        </div>

        {/* Descripción */}
        <div>
          <Label className="block mb-1 text-sm font-medium">Descripción</Label>
          <Controller
            name="Descripcion"
            control={control}
            render={({ field }) => <Input {...field} placeholder="Ingrese la descripción" />}
          />
          {errors.Descripcion && <p className="text-sm text-red-500">{errors.Descripcion.message}</p>}
        </div>

        {/* Autor */}
        <div>
          <Label className="block mb-1 text-sm font-medium">Autor</Label>
          <Controller
            name="Autor"
            control={control}
            render={({ field }) => <Input {...field} placeholder="Ingrese el autor" />}
          />
          {errors.Autor && <p className="text-sm text-red-500">{errors.Autor.message}</p>}
        </div>

        {/* Categorías */}
        <div>
          <Controller
            name="categorias"
            control={control}
            render={({ field }) =>
              <CustomMultiSelect
                field={field}
                data={dataCategoria}
                label="Categorías"
                getOptionLabel={(item) => item.Descripcion}
                getOptionValue={(item) => item.idCategoria}
                error={errors.categorias?.message}
              />
            }
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Condición */}
        <div>
          <Label className="block mb-1 text-sm font-medium">Condición</Label>
          <Controller
            name="idCondicion"
            control={control}
            render={({ field }) =>
              <CustomSelect
                field={field}
                data={dataCondicion}
                label="Condición"
                getOptionLabel={(c) => c.Descripcion}
                getOptionValue={(c) => c.idCondicion}
                error={errors.idCondicion?.message}
              />
            }
          />
        </div>
        {/*Estado*/}        
        <div>
        <Label className="block mb-1 text-sm font-medium">Estado</Label>
        <Controller
          name="idEstado"
          control={control}
          render={({ field }) =>
            <CustomSelect
              field={field}
              data={dataEstado}
              label="Estado"
              getOptionLabel={(e) => e.Descripcion}
              getOptionValue={(e) => e.idEstadoObjeto}
              error={errors.idEstadoObjeto?.message}
            />
          }
        />
      </div>
          </div>    
        {/* Usuario */}
        <div>
          <Label className="block mb-1 text-sm font-medium">Propietario</Label>
          <Input
            readOnly
            value={
              dataUsuario
                ? (
                    dataUsuario.nombre ??
                    dataUsuario.nombreCompleto ??
                    [dataUsuario.firstName, dataUsuario.lastName].filter(Boolean).join(" ")
                  )
                : ""
            }
          />
        </div>

        {/* Imagen */}
        <div className="mb-6">
          <Label className="block mb-1 text-sm font-medium">Imagen</Label>

          <div
            className="relative w-56 h-56 border-2 border-dashed border-muted/50 rounded-lg flex items-center justify-center cursor-pointer overflow-hidden hover:border-primary transition-colors"
            onClick={() => document.getElementById("image").click()}
          >
            {!fileURL && (
              <div className="text-center px-4">
                <p className="text-sm text-muted-foreground">Haz clic o arrastra una imagen</p>
                <p className="text-xs text-muted-foreground">(jpg, png, máximo 5MB)</p>
              </div>
            )}

            {fileURL && (
              <img
                src={fileURL}
                alt="preview"
                className="w-full h-full object-contain rounded-lg shadow-sm"
              />
            )}
          </div>

          <input
            type="file"
            id="image"
            className="hidden"
            accept="image/*"
            onChange={handleChangeImage}
          />
        </div>

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

          <Button type="submit" className="flex-1">
            <Save className="w-4 h-4" />
            Guardar
          </Button>
        </div>

      </form>
    </Card>
  );
}