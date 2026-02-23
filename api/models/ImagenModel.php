<?php
class ImagenModel
{
    private $upload_path = 'uploads/';
    private $valid_extensions = array('jpeg', 'jpg', 'png', 'gif');

    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }



    //Subir imagen de una pelicula registrada
    public function uploadFile($object)
    {
        return false;
    }


    public function all()
    {
        //Consulta sql
        $vSql = "SELECT * FROM imagen order by idImagen desc";
        //Ejecutar la consulta
        $vResultado = $this->enlace->ExecuteSQL($vSql);

        // Retornar el objeto
        return $vResultado;
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