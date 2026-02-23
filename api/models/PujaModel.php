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
        $sub = new SubastaModel();
        $usr = new UsuarioModel();

        //consulta sql
        $vSql = "SELECT * FROM puja order by idPuja desc;";

        //Ejecutar la consulta
        $vResultado = $this->enlace->ExecuteSQL($vSql);

        if (!empty($vResultado) && is_array($vResultado)) {
            for ($i = 0; $i < count($vResultado); $i++) {
                $puj = $vResultado[$i];
                        
                $puj->subasta = $sub->get((int)$puj->idSubasta);
                    
                $puj->usuario = $usr->get((int)$puj->idUsuario)->nombreCompleto;
            }
        }

        return $vResultado;
    }
    /*Obtener */
    public function get($id)
    {
        
        $sub = new SubastaModel();
        $usr = new UsuarioModel();
        $vSql = "SELECT * FROM puja where idPuja=$id";

        $vResultado = $this->enlace->ExecuteSQL($vSql);
        $vResultado = $vResultado[0];
        $vResultado->subasta = $sub->get((int)$vResultado->idSubasta);
        $vResultado->usuario = $usr->get((int)$vResultado->idUsuario)->nombreCompleto;

        return $vResultado;
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

    //Campo Calculado para pujas por subastas 
    public function contarPujasbySubasta(int $idSubasta): int
    {

        $sql  = "SELECT COUNT(*) AS totalPujas
        FROM puja
        WHERE idSubasta = $idSubasta";
        $rows = $this->enlace->ExecuteSQL($sql, [$idSubasta]);
        return $rows ? (int)$rows[0]->totalPujas : 0;
    }

    /*Obtener pujas por usuario*/
    public function getPujasbyUsuario($idUsuario)
    {
        $vSql = "SELECT * FROM puja where idUsuario=$idUsuario";
        $vResultado = $this->enlace->ExecuteSQL($vSql);
        return $vResultado;
    }

    //pujas por subasta
    public function getPujasbySubasta($idSubasta){
        //Consulta sql
        $vSql = "SELECT * FROM puja where idSubasta=$idSubasta";    
        $vResultado = $this->enlace->ExecuteSQL($vSql);
        // Retornar el objeto
        return $vResultado;
    }
}