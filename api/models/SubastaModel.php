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
        //Consulta sql
        $vSql = "SELECT * FROM subasta order by idSubasta desc;";

        //Ejecutar la consulta
        $vResultado = $this->enlace->ExecuteSQL($vSql);

        if (!empty($vResultado) && is_array($vResultado)) {
            for ($i = 0; $i < count($vResultado); $i++) {
                $sub = $vResultado[$i];
                        
                $sub->objeto = $obj->get((int)$sub->idObjeto);
                    
                $sub->estadosubasta = $estSub->get((int)$sub->idEstadoSubasta)->Descripcion;
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
}