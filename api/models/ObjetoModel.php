<?php
class ObjetoModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }
    /*Listar */
    public function all()
    {
    
        $cond = new CondicionModel();
        $imag = new ImagenModel();
        $cat = new CategoriaModel();
        $estObj = new EstadoObjetoModel();
        $usr = new UsuarioModel();
        $sub = new SubastaModel();

        //Consulta sql
        $vSql = "SELECT * FROM objeto order by idObjeto desc;";
        //Ejecutar la consulta
        $vResultado = $this->enlace->ExecuteSQL($vSql);

            if (!empty($vResultado) && is_array($vResultado)) {
                for ($i = 0; $i < count($vResultado); $i++) {
            $obj = $vResultado[$i];
            
            $obj->propietario = $usr->get((int)$obj->idUsuario)->nombreCompleto;

            $obj->categorias = $cat->getCategoriaObjeto((int)$obj->idObjeto);

            $obj->condicion = $cond->get((int)$obj->idCondicion)->Descripcion;

            $imgObj = $imag->getImagenObjeto((int)$obj->idObjeto);
            $obj->imagen = $imgObj ? $imgObj->imagen : null; // o "" si quieres cadena vacía

            $obj->estado = $estObj->get((int)$obj->idEstado)->Descripcion;
            $subastas = $sub->getSubastaByObjeto((int)$obj->idObjeto); // devuelve array
            $obj->subasta = !empty($subastas) ? $subastas : [];
            
            // Ver si hay subasta activa
            $obj->subastaActiva = false;
            foreach ($obj->subasta as $s) {
                if (isset($s->idEstadoSubasta) && $s->idEstadoSubasta == "3") {
                    $obj->subastaActiva = true;
                    break;
                }
            }
            }
            }


        // Retornar el objeto
        return $vResultado;
    }
    /*Obtener */
    public function get($id)
    {
        $cond = new CondicionModel();
        $imag = new ImagenModel();
        $cat = new CategoriaModel();
        $estObj = new EstadoObjetoModel();
        $usr = new UsuarioModel();
        $sub = new SubastaModel();
        //Consulta sql
        $vSql = "SELECT * FROM objeto where idObjeto=$id";
        $vResultado = $this->enlace->ExecuteSQL($vSql);

        $vResultado = $vResultado[0];

            $vResultado->propietario = $usr->get((int)$vResultado->idUsuario)->nombreCompleto;

            $vResultado->categorias = $cat->getCategoriaObjeto((int)$vResultado->idObjeto);

            $vResultado->condicion = $cond->get((int)$vResultado->idCondicion)->Descripcion;
            
            $imagenObj = $imag->getImagenObjeto((int)$vResultado->idObjeto);
            // Si existe la imagen, tomarla; si no, dejarla como null o placeholder
            $vResultado->imagen = $imagenObj ? $imagenObj->imagen : null;
            $vResultado->estado = $estObj->get((int)$vResultado->idEstado)->Descripcion;
            $subastas = $sub->getSubastaByObjeto((int)$vResultado->idObjeto); // devuelve array
            $vResultado->subasta = !empty($subastas) ? $subastas : [];
            
            // Ver si hay subasta activa
            $vResultado->subastaActiva = false;
            foreach ($vResultado->subasta as $s) {
                if (isset($s->idEstadoSubasta) && $s->idEstadoSubasta == "3") {
                    $vResultado->subastaActiva = true;
                    break;
                }
            }


        return $vResultado;
    }

public function getObjetoByUsuario($id)
{
    $cond = new CondicionModel();
    $imag = new ImagenModel();
    $cat = new CategoriaModel();
    $estObj = new EstadoObjetoModel();
    $usr = new UsuarioModel();
    $sub = new SubastaModel();

    $vSql = "SELECT * FROM objeto WHERE idUsuario = $id AND idEstado = 1 ORDER BY idObjeto DESC;";
    $vResultado = $this->enlace->ExecuteSQL($vSql);

    if (!empty($vResultado) && is_array($vResultado)) {
        foreach ($vResultado as $obj) {

            $obj->propietario = $usr->get((int)$obj->idUsuario)->nombreCompleto;
            $obj->categorias = $cat->getCategoriaObjeto((int)$obj->idObjeto);
            $obj->condicion = $cond->get((int)$obj->idCondicion)->Descripcion;

            $imgObj = $imag->getImagenObjeto((int)$obj->idObjeto);
            $obj->imagen = $imgObj ? $imgObj->imagen : null;

            $obj->estado = $estObj->get((int)$obj->idEstado)->Descripcion;

            // Subasta: siempre array, incluso si no tiene subasta
            $subastas = $sub->getSubastaByObjeto((int)$obj->idObjeto); // devuelve array
            $obj->subasta = !empty($subastas) ? $subastas : [];
            
            // Ver si hay subasta activa
            $obj->subastaActiva = false;
            foreach ($obj->subasta as $s) {
                if (isset($s->idEstadoSubasta) && $s->idEstadoSubasta == "3") {
                    $obj->subastaActiva = true;
                    break;
                }
            }
        }
    }

    return $vResultado;
}


public function create($objeto)
{
    // Usuario simulado (hasta que exista login)
    //$_SESSION['idUsuario'] = $usuario->id; // guardamos el id del usuario logueado

    $idEstado = 1; // Activo
    // Insertar objeto
    $sql = "INSERT INTO objeto
            (idUsuario, Nombre, Descripcion, Autor, FechaRegistro, idCondicion, idEstado)
            VALUES
            ($objeto->idUsuario,
            '$objeto->Nombre',
            '$objeto->Descripcion',
            '$objeto->Autor',
            NOW(),
            $objeto->idCondicion,
            $idEstado)";

    // Ejecutar consulta y obtener ID generado
    $idObjeto = $this->enlace->executeSQL_DML_last($sql);

    // --- Categorías ---
    if (!empty($objeto->categorias)) {
        foreach ($objeto->categorias as $categoria) {
            $sql = "INSERT INTO ObjetoCategoria (idObjeto, idCategoria)
                    VALUES ($idObjeto, $categoria)";
            $this->enlace->executeSQL_DML($sql);
        }
    }

    // Retornar objeto creado
    return $this->get($idObjeto);

}
public function update($objeto)
{
    // Actualizar objeto
    $sql = "UPDATE objeto SET
            Nombre = '$objeto->Nombre',
            Descripcion = '$objeto->Descripcion',
            Autor = '$objeto->Autor',
            idCondicion = $objeto->idCondicion,
            idEstado = $objeto->idEstado
            WHERE idObjeto = $objeto->idObjeto";

    $this->enlace->executeSQL_DML($sql);

    $sql = "DELETE FROM ObjetoCategoria WHERE idObjeto = $objeto->idObjeto";
    $this->enlace->executeSQL_DML($sql);

    if (!empty($objeto->categorias)) {
        foreach ($objeto->categorias as $categoria) {
            $sql = "INSERT INTO ObjetoCategoria (idObjeto, idCategoria)
                    VALUES ($objeto->idObjeto, $categoria)";
            $this->enlace->executeSQL_DML($sql);
        }
    }

    return $this->get($objeto->idObjeto);
}
}