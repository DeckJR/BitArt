import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

// shadcn/ui
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
// icons
import {Save, ArrowLeft } from "lucide-react";

// servicios
import UsuarioService from "../../services/UsuarioService";
// import RolService from "../../services/RolService";
import EstadoUsuarioService from "../../services/EstadoUsuarioService"; 

// componentes reutilizables
/* import { CustomSelect } from "../ui/custom/custom-select";*/
import { CustomInputField } from "../ui/custom/custom-input-field";
import { Input } from "../ui/input";
import { CustomSelect } from "../ui/custom/custom-select";

export function UpdateUsuario() {
  const navigate = useNavigate();
  const { id } = useParams(); // id del usuario a actualizar
  //Guardar usuario a modificar
 // const [dataRol, setDataRol] = useState([]);
  const [dataEstadoUsuario, setDataEstadoUsuario] = useState([]); 
  const [error, setError] = useState("");
  const [rol, setRol] = useState("");
  const [fechaRegistro, setFecha] = useState ("");
  const [estadoDescripcion, setEstadoDescripcion] = useState("");
  const estadoColor = estadoDescripcion === "Activo"? "text-green-600 border-green-500": estadoDescripcion === "Inactivo"? "text-red-600 border-red-500": "";

  /*** Esquema de validación Yup ***/
  const usuarioSchema = yup.object({
        Nombre: yup.string().required('El nombre es requerido').min(3,'El nombre debe tener 3 caracteres'),
        Apellido1: yup.string().required('El primer apellido es requerido').min(4,'El primer apellido debe tener mínimo 4 caracteres'),
        Apellido2: yup.string().required('El segundo apellido es requerido').min(4,'El segundo apellido debe tener mínimo 4 caracteres'),
        Correo: yup.string().required('El correo es requerido').min(10,'El correo debe de tener minimo 10 caracteres').matches(/@/, 'El correo debe contener @').email('Debe ingresar un correo válido'),
        idEstadoUsuario: yup.number().required("Debe seleccionar un estado").typeError("Debe seleccionar un estado").positive("Debe seleccionar un estado válido")    
      });

  /*** React Hook Form ***/
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      idUsuario: "",
      Nombre: "",
      Apellido1: "",
      Apellido2: "",
      Correo: "",
      idEstadoUsuario: "",
    },
    resolver: yupResolver(usuarioSchema),
  });

  /*** Cargar selects y datos del usuario ***/
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const roles = await RolService.getAllRol();
        const estados = await EstadoUsuarioService.getAllEstadoUsuario(); 
        const usuario = await UsuarioService.getUsuarioById(id);

        // Si la petición es exitosa, se guardan los datos
        // setDataRol(roles.data.data || []);
        setDataEstadoUsuario(estados.data.data || []);       
        //Asignar al formulario el usuario a actualizar
        
          setRol(usuario.data.data.rol);
          setFecha(usuario.data.data.FechaRegistro);
        if (usuario.data) {
          const user = usuario.data.data
          console.log(user)
          reset({
            idUsuario: user.idUsuario,
            Nombre: user.Nombre,
            Apellido1: user.Apellido1,
            Apellido2: user.Apellido2,
            Correo: user.Correo,
            Contrasenna: user.Contrasenna,
            idRol: user.idRol,
            idEstadoUsuario: user.idEstadoUsuario,
            fechaRegistro: user.fechaRegistro            
          });
        }
        setEstadoDescripcion(usuario.data.data.estadoDescripcion);

      } catch (err) {
        // Si el error no es por cancelación, se registra
        if (err.name !== "AbortError") setError(err.message);
      }
    };

    fetchData();
  }, [id, reset]);


  /*** Submit ***/
  const onSubmit = async (dataForm) => {
    try {
      // isValid es async y recibe los datos
      const isValid = await usuarioSchema.isValid(dataForm);
      if (!isValid) return;

      const response = await UsuarioService.updateUsuario(dataForm);
      //notificación
      if (response.data) {
        //Notificar
        toast.success(`Usuario Actualizado ${response.data.data.Nombre} - ${response.data.data.Apellido1} - ${response.data.data.Apellido2}`,
          { duration: 3000 }
        )
        //Redireccionar a la lista
        navigate("/usuario/table")
      } else if (response.error) {
        setError(response.error)
      }

    } catch (err) {
      console.error(err);
      setError("Error al actualizar el usuario");
    }
  };

  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <Card className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Actualizar Usuario</h2>

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
        {/*Habilitar si se requiere en un futuro o para consultar a la profe } 
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10"> */}
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
          {/*Contraseña 
          <div>
            {/*Contraseña}
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
        </div>   Quitar comentario para que se vea la contraseña     
        {/* Rol y Estado*/}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10"> 
          {/* 
          <div>
            <Label className="block mb-1 text-sm font-medium">Rol</Label>            
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
                  isDisabled = {true}
                />
              }
            />
          </div> */}
          <div>
            <Label className="block mb-1 text-sm font-medium">Rol</Label>
            <Input value={rol} disabled />
          </div>
          {/*Estado*/}        
          <div>
            <Label className={`block mb-1 text-sm font-medium ${estadoColor}`}>Estado</Label>
            <Controller
              name="idEstadoUsuario"
              control={control}
              render={({field})=>
                <CustomSelect
                  field={{...field,onChange: (value) => 
                    {field.onChange(value)
                      const estado = dataEstadoUsuario.find((e) => e.idEstadoUsuario === value) 
                        setEstadoDescripcion(estado?.Descripcion)
                    }
                  }}
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
        

        <div>
          <Label className="block mb-1 text-sm font-medium">Fecha de registro</Label>
          <Input value={fechaRegistro} disabled />
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