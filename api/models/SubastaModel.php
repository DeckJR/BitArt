<?php
class SubastaModel
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
        $vSql = "SELECT * FROM subasta;";

        //Ejecutar la consulta
        $vResultado = $this->enlace->ExecuteSQL($vSql);

        // Retornar el objeto
        return $vResultado;
    }
    /*Obtener */
    public function get($id)
    {
        //Consulta sql
        $vSql = "SELECT * FROM subasta where id=$id";

        //Ejecutar la consulta
        $vResultado = $this->enlace->ExecuteSQL($vSql);
        // Retornar el objeto
        return $vResultado[0];
    }
}