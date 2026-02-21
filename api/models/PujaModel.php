<?php
class PujaModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }
    /*Listar */
    public function all()
    {
        $vSql = "SELECT * FROM puja;";

        $vResultado = $this->enlace->ExecuteSQL($vSql);
        return $vResultado;
    }
    /*Obtener */
    public function get($id)
    {
        $vSql = "SELECT * FROM puja where idPuja=$id";

        $vResultado = $this->enlace->ExecuteSQL($vSql);
        return $vResultado[0];
    }

//Campo Calculado si es vendedor
public function contarPujasbyUsuario(int $idUsuario): int
{

    $sql  = "SELECT COUNT(*) AS totalPujas
    FROM puja
    WHERE idUsuario = $idUsuario";
    $rows = $this->enlace->ExecuteSQL($sql, [$idUsuario]);

    return $rows ? (int)$rows[0]->totalPujas : 0;
}




    /*Obtener pujas por usuario*/
    public function getPujasbyUsuario($idUsuario)
    {
        $vSql = "SELECT * FROM puja where idUsuario=$idUsuario";
                                                                        /*debo agregar el nombre del usuario?*/
        $vResultado = $this->enlace->ExecuteSQL($vSql);
        return $vResultado[0];
    }

    //pujas por subasta
    public function getPujasbySubasta($idSubasta){
        //Consulta sql
        $vSql = "SELECT * FROM puja where idSubasta=$idSubasta";    
        $vResultado = $this->enlace->ExecuteSQL($vSql);
        // Retornar el objeto
        return $vResultado[0];
    }

}