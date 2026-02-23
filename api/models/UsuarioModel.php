<?php
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
            $usr->rol = $rolM->getRolUsuario((int)$usr->idRol)->Descripcion;

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
			$rol = $rolM->getRolUsuario($vResultado->idRol)->Descripcion;
            $estado = $estadoUM -> get($vResultado->idEstadoUsuario)-> Descripcion;
			$vResultado->rol = $rol;
            $vResultado->estado = $estado;
            if($vResultado->idRol == 2)
                {
                    $sub = new SubastaModel();
                    $vResultado->CantidadSubastas = $sub->contarSubastabyUsuario((int)$vResultado->idUsuario);
                } 
                else if ($vResultado->idRol == 3)
                {
                    $puj = new PujaModel();
                    $vResultado->CantidadPujas = $puj->contarPujasbyUsuario((int)$vResultado->idUsuario);                    
                }

			// Retornar el objeto
			return $vResultado;
		} 
    }
}
