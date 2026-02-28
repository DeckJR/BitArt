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
        $obj = new ObjetoModel();
        $estSub = new EstadoSubastaModel();
        $puj = new PujaModel();
        //Consulta sql
        $vSql = "SELECT * FROM subasta where idEstadoSubasta = 2  order by idSubasta desc
";

        //Ejecutar la consulta
        $vResultado = $this->enlace->ExecuteSQL($vSql);

        if (!empty($vResultado) && is_array($vResultado)) {
            for ($i = 0; $i < count($vResultado); $i++) {
                $sub = $vResultado[$i];
                        
                $sub->objeto = $obj->get((int)$sub->idObjeto);
                    
                $sub->estadosubasta = $estSub->get((int)$sub->idEstadoSubasta)->Descripcion;

                $sub->CantidadPujas = $puj->contarPujasbySubasta((int)$sub->idSubasta);

            }
        }

        // Retornar el objeto
        return $vResultado;
    }
    /*Obtener */
    public function get($id)
    {
        
        $obj = new ObjetoModel();
        $estSub = new EstadoSubastaModel();
        $puj = new PujaModel();
        //Consulta sql
        $vSql = "SELECT * FROM subasta where idSubasta=$id";
        //Ejecutar la consulta
        $vResultado = $this->enlace->ExecuteSQL($vSql);

        $vResultado = $vResultado[0];
        
        $vResultado->objeto = $obj->get((int)$vResultado->idObjeto);
        
        $vResultado->estadosubasta = $estSub->get((int)$vResultado->idEstadoSubasta)->Descripcion;

        $vResultado->CantidadPujas = $puj->contarPujasbySubasta((int)$vResultado->idSubasta);

        // Retornar el objeto
        return $vResultado;
    }

    public function allActivas()
    {
        $obj = new ObjetoModel();
        $estSub = new EstadoSubastaModel();
        $puj = new PujaModel();
        //Consulta sql
        $vSql = "SELECT * FROM subasta where idEstadoSubasta = 2 order by idSubasta desc;";

        //Ejecutar la consulta
        $vResultado = $this->enlace->ExecuteSQL($vSql);

        if (!empty($vResultado) && is_array($vResultado)) {
            for ($i = 0; $i < count($vResultado); $i++) {
                $sub = $vResultado[$i];
                        
                $sub->objeto = $obj->get((int)$sub->idObjeto);
                    
                $sub->estadosubasta = $estSub->get((int)$sub->idEstadoSubasta)->Descripcion;

                $sub->CantidadPujas = $puj->contarPujasbySubasta((int)$sub->idSubasta);

            }
        }

        // Retornar el objeto
        return $vResultado;
    }
    public function allFinalizadas()
    {
        $obj = new ObjetoModel();
        $estSub = new EstadoSubastaModel();
        $puj = new PujaModel();
        //Consulta sql
        $vSql = "SELECT * FROM subasta where idEstadoSubasta = 3 order by idSubasta desc;";

        //Ejecutar la consulta
        $vResultado = $this->enlace->ExecuteSQL($vSql);

        if (!empty($vResultado) && is_array($vResultado)) {
            for ($i = 0; $i < count($vResultado); $i++) {
                $sub = $vResultado[$i];
                        
                $sub->objeto = $obj->get((int)$sub->idObjeto);
                    
                $sub->estadosubasta = $estSub->get((int)$sub->idEstadoSubasta)->Descripcion;

                $sub->CantidadPujas = $puj->contarPujasbySubasta((int)$sub->idSubasta);

            }
        }

        // Retornar el objeto
        return $vResultado;
    }





    public function getSubastaByObjeto($idObjeto)
    {
        
        $obj = new ObjetoModel();
        $estSub = new EstadoSubastaModel();
        $puj = new PujaModel();
        //Consulta sql
        $vSql = "SELECT * FROM subasta where idObjeto=$idObjeto";
        //Ejecutar la consulta
        $vResultado = $this->enlace->ExecuteSQL($vSql);

        $vResultado = $vResultado[0];        
        
        $vResultado->estadosubasta = $estSub->get((int)$vResultado->idEstadoSubasta)->Descripcion;

        $vResultado->CantidadPujas = $puj->contarPujasbySubasta((int)$vResultado->idSubasta);

        // Retornar el objeto
        return $vResultado;
    }
    //Campo Calculado para pujas por subastas 
    public function contarSubastabyUsuario(int $idUsuario): int
    {
        /*Se busca la lista de objetos asociados al usuario y luego los objetos asociados a la subasta */
        $sql  = "SELECT COUNT(*) AS totalSubastas
                FROM subasta
                WHERE idObjeto IN (
                    SELECT idObjeto
                    FROM objeto
                    WHERE idUsuario = $idUsuario
                );";
        $rows = $this->enlace->ExecuteSQL($sql, [$idUsuario]);
        return $rows ? (int)$rows[0]->totalSubastas : 0;
    }
}