<?php
class PagoModel
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
        $vSql = "SELECT * FROM pago;";

        //Ejecutar la consulta
        $vResultado = $this->enlace->ExecuteSQL($vSql);

        // Retornar el objeto
        return $vResultado;
    }
    /*Obtener */
    public function get($id)
    {
        $sub = new SubastaModel();
        //Consulta sql
        $vSql = "SELECT * FROM pago where idPago=$id";

        //Ejecutar la consulta
        $vResultado = $this->enlace->ExecuteSQL($vSql);
        
        $vResultado = $vResultado[0];
        $vResultado -> subasta = $sub ->get((int)$vResultado->idSubasta);
        // Retornar el objeto
        return $vResultado;
    }

    public function getPagobySubasta($idSubasta)
    {
        $sub = new SubastaModel();
        //Consulta sql
        $vSql = "SELECT * FROM pago where idSubasta=$idSubasta";

        //Ejecutar la consulta
        $vResultado = $this->enlace->ExecuteSQL($vSql);
        
        $vResultado = $vResultado[0];
        $vResultado -> subasta = $sub ->get((int)$idSubasta);
        // Retornar el objeto
        return $vResultado;
    }



}