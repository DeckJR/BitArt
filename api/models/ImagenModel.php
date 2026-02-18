<?php
class ImagenModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }
    /*Listar */
    public function all()
    {
        //Consulta sql
        $vSql = "SELECT * FROM imagen;";

        //Ejecutar la consulta
        $vResultado = $this->enlace->ExecuteSQL($vSql);

        // Retornar el objeto
        return $vResultado;
    }
    /*Obtener */
    public function get($id)
    {
        //Consulta sql
        $vSql = "SELECT * FROM imagen where id=$id";

        //Ejecutar la consulta
        $vResultado = $this->enlace->ExecuteSQL($vSql);
        // Retornar el objeto
        return $vResultado[0];
    }
      //Subir imagen de una pelicula registrada
    public function uploadFile($object)
    {
        return false;
    }
    //Obtener una imagen de una pelicula
    public function getImagenObjeto($idObjeto)
    {
        //Consulta sql
        $vSql = "SELECT * FROM imagen where idObjeto=$idObjeto";

        //Ejecutar la consulta
        $vResultado = $this->enlace->ExecuteSQL($vSql);
        if (!empty($vResultado)) {
            // Retornar el objeto
            return $vResultado[0];
        }
        return $vResultado;
    }
}