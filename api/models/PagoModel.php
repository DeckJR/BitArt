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

 public function getPagoBySubasta($idSubasta)
{
    $sql = "SELECT * FROM pago WHERE idSubasta = $idSubasta";

    $result = $this->enlace->executeSQL($sql);

    return empty($result) ? null : $result[0];
}


    public function create($objeto)
{
    $sql = "INSERT INTO pago (
                idSubasta,
                idUsuario,
                FechaPago,
                idEstadoPago,
                MontoFinal
            )
            VALUES (
                $objeto->idSubasta,
                $objeto->idUsuario,
                '$objeto->FechaPago',
                $objeto->idEstadoPago,
                $objeto->MontoFinal
            )";

    $id = $this->enlace->executeSQL_DML_last($sql);

    return $this->get($id);
}

}