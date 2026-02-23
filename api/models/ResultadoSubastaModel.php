<?php
class ResultadoSubastaModel
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
        //Consulta sql
        $vSql = "SELECT * FROM resultadosubasta order by idResultadoSubasta desc;";

        //Ejecutar la consulta
        $vResultado = $this->enlace->ExecuteSQL($vSql);
        
        if (!empty($vResultado) && is_array($vResultado)) {
            for ($i = 0; $i < count($vResultado); $i++) {
                $reSu = $vResultado[$i];
                        
                $reSu->subasta = $sub->get((int)$reSu->idSubasta);
                    
                $reSu->comprador = $usr->get((int)$reSu->idUsuario)->nombreCompleto;
            }
        }
        

        // Retornar el objeto
        return $vResultado;
    }
    /*Obtener */
    public function get($id)
    {
        $sub = new SubastaModel();
        $usr = new UsuarioModel();
        //Consulta sql
        $vSql = "SELECT * FROM resultadosubasta where idResultadoSubasta=$id";

        //Ejecutar la consulta
        $vResultado = $this->enlace->ExecuteSQL($vSql);

        $vResultado = $vResultado[0];

        $vResultado->subasta = $sub->get((int)$vResultado->idSubasta);
                    
        $vResultado->comprador = $usr->get((int)$vResultado->idUsuario)->nombreCompleto;


        // Retornar el objeto
        return $vResultado;
    }
}