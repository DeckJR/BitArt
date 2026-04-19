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

public function getResultadoBySubasta($idSubasta)
{
    $sub = new SubastaModel();
    $usr = new UsuarioModel();

    $sql = "SELECT * 
            FROM resultadosubasta 
            WHERE idSubasta = $idSubasta";

    $result = $this->enlace->executeSQL($sql);

    if (empty($result)) {
        return null;
    }

    $vResultado = $result[0];

    $vResultado->subasta = $sub->get((int)$vResultado->idSubasta);
    $vResultado->comprador = $usr->get((int)$vResultado->idUsuario)->nombreCompleto;

    return $vResultado;
}

    public function create($objeto)
{
    $sql = "INSERT INTO resultadosubasta (
                idSubasta,
                idUsuario,
                MontoFinal
            )
            VALUES (
                $objeto->idSubasta,
                $objeto->idUsuario,
                $objeto->MontoFinal
            )";

    $id = $this->enlace->executeSQL_DML_last($sql);

    return $this->get($id);
}




}