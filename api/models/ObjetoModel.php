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

        //Consulta sql
        $vSql = "SELECT * FROM objeto order by idObjeto desc;";
        //Ejecutar la consulta
        $vResultado = $this->enlace->ExecuteSQL($vSql);

            if (!empty($vResultado) && is_array($vResultado)) {
                for ($i = 0; $i < count($vResultado); $i++) {
            $obj = $vResultado[$i];
            
            $obj->Dueño = $usr->get((int)$obj->idUsuario)->nombreCompleto;

            $obj->categorias = $cat->getCategoriaObjeto((int)$obj->idObjeto);

            $obj->condicion = $cond->get((int)$obj->idCondicion)->Descripcion;

            $obj->imagen = $imag->getImagenObjeto((int)$obj->idObjeto)->imagen;

            $obj->estado = $estObj->get((int)$obj->idEstado)->Descripcion;

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
        //Consulta sql
        $vSql = "SELECT * FROM objeto where idObjeto=$id";
        $vResultado = $this->enlace->ExecuteSQL($vSql);

        $vResultado = $vResultado[0];

            $vResultado->usuario = $usr->get((int)$vResultado->idUsuario)->Nombre;

            $vResultado->categorias = $cat->getCategoriaObjeto((int)$vResultado->idObjeto);

            $vResultado->condicion = $cond->get((int)$vResultado->idCondicion)->Descripcion;

            $vResultado->imagen = $imag->getImagenObjeto((int)$vResultado->idObjeto)->imagen;

            $vResultado->estado = $estObj->get((int)$vResultado->idEstado)->Descripcion;

        return $vResultado;
    }
}