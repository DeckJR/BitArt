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
import ObjetoService from "../../services/ObjetoService";
import ImagenService from "@/services/ImagenService";
import CategoriaService from "@/services/CategoriaService";
import CondicionService from "@/services/CondicionService";
// componentes reutilizables
import { CustomMultiSelect } from "../ui/custom/custom-multiple-select"; // select multi con chips
import { CustomSelect } from "../ui/custom/custom-select";
import UsuarioService from "@/services/UsuarioService";
import { useUser } from "@/hooks/useUser";

export function CreateObjeto() {
  const navigate = useNavigate();
  const { user } = useUser();
  
  /*** Estados para selects y preview de imagen ***/
  const [dataUsuario, setDataUsuario] = useState(null);
  const [dataCategoria, setDataCategoria] = useState([]);
  const [dataCondicion, setDataCondicion] = useState([]);
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  const [error, setError] = useState("");

  /*** Esquema de validación Yup ***/
  const ObjetoSchema= yup.object({
      //idUsuario: yup.number().required('El usuario es requerido').typeError('Debe seleccionar un usuario').positive('Debe seleccionar un usuario válido'),
      Nombre: yup.string().required('El nombre es requerido').min(3,'El nombre debe tener 3 caracteres'),
      Descripcion: yup.string().required('La descripción es requerida').min(20,'La descripción debe tener mínimo 20 caracteres'),
      Autor: yup.string().required('El autor es requerido').min(3,'El autor debe tener 3 caracteres'),
      idCondicion: yup.number().required('La condición es requerida').typeError('Debe seleccionar una condición').positive('Debe seleccionar una condición válida'),
      categorias: yup.array().min(1, 'Se requiere al menos una categoría'),
      
      //Validación personalizada para el campo de imagen

  })


  /*** React Hook Form ***/
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Nombre: "",
      Descripcion: "",
      Autor: "",
      idCondicion: "",
    //idEstado: "", se quema en el backend como activo ya que es el estado inicial del objeto
      categorias: [], 
    },
    resolver:yupResolver(ObjetoSchema)
  });

  /*** Manejo de imagen ***/
  const handleChangeImage = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileURL(URL.createObjectURL(selectedFile));
    }
  };
    //se quema al simular
      
  /***Listados de carga en el formulario ***/
  useEffect(()=>{
    const fechData=async()=>{
      try {
        
        const usuarioRes = await UsuarioService.getUsuarioById(user?.idUsuario);
        const categoriasRes= await CategoriaService.getAllCategoria();
        const condicionRes = await CondicionService.getAllCondicion();
        //Lista de actores
        // Si la petición es exitosa, se guardan los datos 
        setDataUsuario(usuarioRes.data.data || []); 
        setDataCategoria(categoriasRes.data.data || []); 
        setDataCondicion(condicionRes.data.data || []);
        
        console.log(usuarioRes) 
        console.log(categoriasRes) 
        console.log(condicionRes) 

      } catch (error) {
        console.log(error)
        if(error.name != "AbortError") setError(error.message)
      }
    }
    fechData()
  },[])

  /*** Submit ***/
  const onSubmit = async (dataForm) => {
    if (!file) {
      toast.error("Debes seleccionar una imagen para la pintura.", { duration: 3000 });
      return;
    }

    try {
      dataForm.idUsuario = user?.idUsuario;
      console.log(dataForm)
      if (ObjetoSchema.isValid()) { 
        //Verificar datos del formulario 
        console.log(dataForm) 
        //Crear pelicula en el API 
        const response= await ObjetoService.createObjeto(dataForm)// falta hacer el servicio,controller y modelo para crear el objeto.
        if(response.data){
          //archivo FormData
          const formData=new FormData()
          formData.append("file",file)
          formData.append("idObjeto",response.data.data.idObjeto)
          //Guardar
          await ImagenService.createImagen(formData)
          //Notificar
          toast.success(`Objeto creado ${response.data.data.idObjeto} - ${response.data.data.Nombre}`,
            {duration: 3000}
          )
          //Redireccionar a la lista
          navigate("/objeto/table")
        }else if(response.error){
          setError(response.error)
        }

      } 
    } catch (err) {
      console.error(err);
      setError("Error al crear objeto: " + err.message);
    }
  };

  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <Card className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Crear Pintura</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Nombre Pintura */}
        <div>
          <Label className="block mb-1 text-sm font-medium" htmlFor="Nombre">Nombre de la Pintura</Label>
          {/* Controller entrada Nombre */}
          <Controller name="Nombre" control={control} render={({field})=>
            <Input {...field} id="Nombre" placeholder="Ingrese el nombre de la Pintura" />
          }/>
          {/* Error entrada Nombre */}
          {errors.Nombre && <p className="text-sm text-red-500">{errors.Nombre.message}</p>}
        </div>

        {/* Descripcion */}
          <div>
          <Label className="block mb-1 text-sm font-medium" htmlFor="Descripcion">Descripcion</Label>
          {/* Controller entrada Descripcion */}
          <Controller name="Descripcion" control={control} render={({field})=>
            <Input {...field} id="Descripcion" placeholder="Ingrese la descripción de la Pintura" />
          }/>
          {/* Error entrada Descripcion */}
          {errors.Descripcion && <p className="text-sm text-red-500">{errors.Descripcion.message}</p>}
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/*Autor*/}
          <div>
          <Label className="block mb-1 text-sm font-medium" htmlFor="Autor">Autor</Label>
          {/* Controller entrada Autor */}
          <Controller name="Autor" control={control} render={({field})=>
            <Input {...field} id="Autor" placeholder="Ingrese el nombre del autor" />
          }/>
          {/* Error entrada Autor */}
          {errors.Autor && <p className="text-sm text-red-500">{errors.Autor.message}</p>}
        </div>
        </div>
        {/* Categorías */}
        <div>
          {/* Controller entrada generos */}
          <Controller name="categorias" control={control} render={({field})=> 
            <CustomMultiSelect
              field={field}
              data={dataCategoria}
              label="Categorías"
              getOptionLabel={(item)=>item.Descripcion}
              getOptionValue={(item)=> item.idCategoria} 
              error={errors.categorias?.message}
            />
          } />
        </div>

        {/* Condición */}
        <div>
          <Label className="block mb-1 text-sm font-medium">Condición</Label>
          {/* Controller entrada condición */}
          <Controller name="idCondicion" control={control} render={({field})=> 
            <CustomSelect
              field={field}
              data={dataCondicion}
              label="la condición"
              getOptionLabel={(condicion)=>`${condicion.Descripcion}`}
              getOptionValue={(condicion)=> condicion.idCondicion} 
              error={errors.idCondicion?.message}
            />
          } />
        </div>

        <div>
  <Label className="block mb-1 text-sm font-medium">
    Estado del Objeto
  </Label>

  <Input
    value="Activo"
    readOnly
    className="bg-gray-100"
  />

</div>
      
      {/* Nombre del propietario */}
      <div>
        <Label className="block mb-1 text-sm font-medium" htmlFor="prop-nombre">
          Propietario — Nombre
        </Label>
        <Input
          id="prop-nombre"
          readOnly
          value={
            dataUsuario
              ? (
                  dataUsuario.nombre ??
                  dataUsuario.nombreCompleto ??
                  [dataUsuario.firstName, dataUsuario.lastName].filter(Boolean).join(" ") ??
                  ""
                )
              : "Cargando…"
          }
        />
      </div>

<p className="text-xs text-muted-foreground mt-1">
  El usuario vendedor es asignado automáticamente por el servidor y no es editable.
</p>

        {/* Imagen */}
        <div className="mb-6">
          <Label htmlFor="image" className="block mb-1 text-sm font-medium">
            Imagen
          </Label>

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

        <div className="flex justify-between gap-4 mt-6">
          <Button
            type="button"
            variant="default" // sólido
            className="flex items-center gap-2 bg-accent text-white"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4" />
            Regresar
          </Button>
          {/* Botón Guardar */}
          <Button type="submit" className="flex-1">
            <Save className="w-4 h-4" />
            Guardar
          </Button>
        </div>
      </form>
    </Card>
  );
}
