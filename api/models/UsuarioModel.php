<?php

use Firebase\JWT\JWT;

class UsuarioModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }
    /*Listar */
    public function all()
{
    $rolM   = new RolModel();
    $estadoUM = new EstadoUsuarioModel();

    // Consulta SQL base (sin joins)
    $vSQL = "SELECT * FROM usuario order by idUsuario desc;";

    $vResultado = $this->enlace->ExecuteSQL($vSQL);

    if (!empty($vResultado) && is_array($vResultado)) {
        for ($i = 0; $i < count($vResultado); $i++) {
            $usr = $vResultado[$i];
            
            // Rol (por id)
            $nombreCompleto  = $usr->Nombre;
            $nombreCompleto .= ' '. $usr->Apellido1;
            $nombreCompleto .= ' '. $usr->Apellido2 ;

            // Une y limpia espacios múltiples
            $usr->nombreCompleto = trim($nombreCompleto);
            $usr->rol = $rolM->getRolUsuario((int)$usr->idUsuario)->Descripcion;

            // Estado (por id)
            $usr->estado = $estadoUM->get((int)$usr->idEstadoUsuario)->Descripcion;
            // Si no quieres exponer los ids en el payload final, puedes unsetearlos:
            // unset($usr->idRol, $usr->idEstado);
        }
    }

    return $vResultado;
}

    /*Obtener */
    public function get($id)
    {
        $rolM = new RolModel();
        $estadoUM = new EstadoUsuarioModel();
        
        //Consulta sql
        $vSql = "SELECT * FROM usuario where idUsuario=$id";

        //Ejecutar la consulta
        $vResultado = $this->enlace->ExecuteSQL($vSql);
		if ($vResultado) {
			$vResultado = $vResultado[0];

            $nombre    =$vResultado->Nombre       ?? '';
            $ap1       =$vResultado->Apellido1    ?? '';
            $ap2       =$vResultado->Apellido2    ?? '';

            // Une y limpia espacios múltiples
            $vResultado->nombreCompleto = trim(preg_replace('/\s+/', ' ', "$nombre $ap1 $ap2"));
			$rol = $rolM->getRolUsuario($vResultado->idUsuario)->Descripcion;
            $estado = $estadoUM -> get($vResultado->idEstadoUsuario)-> Descripcion;
			$vResultado->rol = $rol;
            $vResultado->estado = $estado;
            if($vResultado->idRol == 2)
                {
                    $sub = new SubastaModel();
                    $vResultado-> CantidadSubastas = $sub->contarSubastabyUsuario((int)$vResultado->idUsuario);
                } 
                else if ($vResultado->idRol == 3)
                {
                    $puj = new PujaModel();           
                    $vResultado-> CantidadPujas = $puj->contarPujasbyUsuario((int)$vResultado->idUsuario);               
                }
			// Retornar el objeto
			return $vResultado;
		} 
    }
    public function update($usuario)
    {
        // Consulta SQL
        $sql = "UPDATE usuario SET 
                Nombre = '$usuario->Nombre',
                Apellido1 = '$usuario->Apellido1',
                Apellido2 = '$usuario->Apellido2',
                Correo = '$usuario->Correo',
                Contrasenna = '$usuario->Contrasenna',
                idRol = $usuario->idRol,
                idEstadoUsuario = $usuario->idEstadoUsuario
                WHERE idUsuario = $usuario->idUsuario";

        // Ejecutar consulta
        $cResults = $this->enlace->executeSQL_DML($sql);

        // Retornar usuario actualizado
        return $this->get($usuario->idUsuario);
    }

    public function create($usuario)
{
    // Estado activo por defecto
    $idEstadoUsuario = 1;

    // Datos recibidos
    $nombre     = $usuario->Nombre;
    $apellido1  = $usuario->Apellido1;
    $apellido2  = $usuario->Apellido2;
    $correo     = $usuario->Correo;
    $contrasena = password_hash($usuario->Contrasenna, PASSWORD_DEFAULT);
    $idRol      = (int)$usuario->idRol;

    // Insertar usuario
    $sql = "INSERT INTO usuario
            (Nombre, Apellido1, Apellido2, Correo, Contrasenna, idRol, FechaRegistro, idEstadoUsuario)
            VALUES
            ('$nombre',
             '$apellido1',
             '$apellido2',
             '$correo',
             '$contrasena',
             $idRol,
             NOW(),
             $idEstadoUsuario)";

    // Ejecutar y obtener el ID generado
    $idUsuario = $this->enlace->executeSQL_DML_last($sql);

    // Retornar usuario creado
    return $this->get($idUsuario);
}


    public function login($objeto)
    {
        $vSql = "SELECT * FROM usuario WHERE Correo='$objeto->Correo'";
        $vResultado = $this->enlace->ExecuteSQL($vSql);

        if (empty($vResultado)) {
            return false;
        }

       if (is_object($vResultado[0])) {
			$user = $vResultado[0];
			if (password_verify($objeto->Contrasenna, $user->Contrasenna)) {
				$usuario = $this->get($user->idUsuario);
				if (!empty($usuario)) {
                $data = [
						'idUsuario' => $usuario->idUsuario,
						'Correo' => $usuario->Correo,
						'rol' => $usuario->rol,
						'iat' => time(),  // Hora de emisión
						'exp' => time() + 3600 // Expiración en 1 hora
					];

					// Generar el token JWT
					$jwt_token = JWT::encode($data, config::get('SECRET_KEY'), 'HS256');

					// Enviar el token como respuesta
					return $jwt_token;


                }
            }
       } else {
			return false;
}
}

}