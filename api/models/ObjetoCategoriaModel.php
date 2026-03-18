<?php
class ObjetoCategoriaModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }
    /*Pedir para verificar el contenido del JSON*/
    public function GetAllObjetoCategoria(){
        //Consulta sql
        $vSql = "SELECT * FROM objetocategoria ORDER BY idObjeto DESC;";
        //Ejecutar la consulta
        $vResultado = $this->enlace->ExecuteSQL($vSql);

            if (!empty($vResultado) && is_array($vResultado)) {
                for ($i = 0; $i < count($vResultado); $i++) {
            $obj = $vResultado[$i];
                }
            }
                    return $vResultado;

}



}