import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// shadcn/ui
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

// icons
import {Save, ArrowLeft } from "lucide-react";

// servicios
import UsuarioService from "../../services/UsuarioService"
import RolService from "../../services/RolService"
import EstadoUsuarioService from "../../services/EstadoUsuarioService"

// componentes reutilizables
import { CustomSelect } from "../ui/custom/custom-select";
import { CustomInputField } from "../ui/custom/custom-input-field";

export function CreateUsuario() {
  const navigate = useNavigate();

  /*** Estados para selects y preview de imagen ***/
  const [dataRol, setDataRol] = useState([]);
  const [dataEstadoUsuario, setDataEstadoUsuario] = useState([]);
  const [error, setError] = useState("");

  /*** Esquema de validación Yup ***/
  const usuarioSchema= yup.object({
    Nombre: yup.string().required('El nombre es requerido').min(3,'El nombre debe tener 3 caracteres'),
    Apellido1: yup.string().required('El primer apellido es requerido').min(4,'El primer apellido debe tener mínimo 4 caracteres'),
    Apellido2: yup.string().required('El segundo apellido es requerido').min(4,'El segundo apellido debe tener mínimo 4 caracteres'),
    Correo: yup.string().required('El correo es requerido').min(10,'El correo debe de tener minimo 10 caracteres').matches(/@/, 'El correo debe contener @'),
    Contrasenna: yup.string().required('La contraseña es requerida').min(8,'La contraseña debe de tener minimo 10 caracteres').matches(/[0-9]/, "Debe contener al menos un número").matches(/[!@#$%^&*(),.?":{}|<>]/, "Debe contener al menos un carácter especial"),
    idRol: yup.number().required("Debe seleccionar un rol").typeError("Debe seleccionar un rol").positive("Debe seleccionar un rol válido"),
    idEstadoUsuario: yup.number().required("Debe seleccionar un estado").typeError("Debe seleccionar un estado").positive("Debe seleccionar un estado válido")    
  })

  /*** React Hook Form ***/
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Nombre: "",
      Apellido1: "",
      Apellido2: "",
      Correo: "",
      Contrasenna: "",
      idRol: "",
      idEstadoUsuario: "",
    },
    resolver:yupResolver(usuarioSchema)
  });
  /***Listados de carga en el formulario ***/
  useEffect(()=>{
    const fechData=async()=>{
      try {
        //Lista de roles
        const roles= await RolService.getAllRol()
        //Lista de estados
        const estados= await EstadoUsuarioService.getAllEstadoUsuario()
        // Si la petición es exitosa, se guardan los datos 
        setDataRol(roles.data.data || []); 
        setDataEstadoUsuario(estados.data.data || []); 
        console.log(roles)  
        console.log(estados)    
      } catch (error) {
        console.log(error)
        if(error.name != "AbortError") setError(error.message)
      }
    }
    fechData()
  },[])
  /*** Submit ***/
  const onSubmit = async (dataForm) => {
    try {
      console.log(dataForm)
      if (usuarioSchema.isValid()) { 
        //Verificar datos del formulario 
        console.log(dataForm) 
        //Crear usuario en el API 
        const response= await UsuarioService.createUsuario(dataForm)
        if(response.data){          
          //Notificar
          toast.success(`Usuario creado ${response.data.data.idUsuario} - ${response.data.data.Nombre} ${response.data.data.Apellido1} ${response.data.data.Apellido2}`,
            {duration: 3000}
          )
          //Redireccionar a la lista
          navigate("/usuario/table")
        }else if(response.error){
          setError(response.error)
        }

      } 
    } catch (err) {
      console.error(err);
      setError("Error al crear el usuario");
    }
  };

  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <Card className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Crear Usuario</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">        
        {/* Nombre completo (Nombre, Apellido1, Apellido2)*/}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            {/* Controller entrada Nombre */}
            <Controller name="Nombre" control={control} render={({field})=>
              <CustomInputField 
                {...field} 
                label="Nombre" 
                placeholder="Ingrese el nombre"
                error={errors.Nombre?.message}
              />
            } />
          </div>
          {/*Apellido1*/}
          <div>
            <Controller
              name="Apellido1"
              control={control}
              render={({ field }) =>
                <CustomInputField
                  {...field}
                  label="Primer Apellido"
                  placeholder="Ingrese el primer apellido"
                  error={errors.Apellido1?.message} />
              }
            />
          </div>
          {/*Apellido2*/}
          <div>
            <Controller
              name="Apellido2"
              control={control}
              render={({ field }) =>
                <CustomInputField
                  {...field}
                  label="Segundo Apellido"
                  placeholder="Ingrese su segundo apellido"
                  error={errors.Apellido2?.message} />}
            />
          </div>
        </div>
        {/* Correo y contraseña*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div>
            {/* Controller entrada correo */}
            <Controller name="Correo" control={control} render={({field})=>
              <CustomInputField 
                {...field} 
                label="Correo" 
                placeholder="correo@ejemplo.com"
                error={errors.Correo?.message}
              />
            } />
          </div>
          {/*Contraseña*/}
          <div>
            <Controller
              name="Contrasenna"
              control={control}
              render={({ field }) =>
                <CustomInputField
                  {...field}
                  type="password"
                  label="Contraseña"
                  placeholder="Ingrese la contraseña"
                  error={errors.Contrasenna?.message} />
              }
            />
          </div>
        </div>        
        {/* Rol y Estado*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div>
            <Label className="block mb-1 text-sm font-medium">Rol</Label>
            {/* Controller entrada el rol */}
            <Controller
              name="idRol"
              control={control}
              render={({field})=>
                <CustomSelect
                  field={field}
                  data={dataRol}
                  label="Rol"
                  getOptionLabel={(rol)=>rol.Descripcion}
                  getOptionValue={(rol)=>rol.idRol}
                  error={errors.idRol?.message}
                />
              }
            />
          </div>
          {/*Contraseña*/}          
          <div>
            <Label className="block mb-1 text-sm font-medium">Estado</Label>
            <Controller
              name="idEstadoUsuario"
              control={control}
              render={({field})=>
                <CustomSelect
                  field={field}
                  data={dataEstadoUsuario}
                  label="Estado"
                  getOptionLabel={(estado)=>estado.Descripcion}
                  getOptionValue={(estado)=>estado.idEstadoUsuario}
                  error={errors.idEstadoUsuario?.message}
                />
              }
            />
          </div>
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