<?php
class resultadosubasta
{
    public function index()
    {
        try {
            $response = new Response();
            //Obtener el listado del Modelo
            $resultadosubasta = new ResultadoSubastaModel();
            $result = $resultadosubasta->all();
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }
    public function get($param)
    {
        try {
            $response = new Response();
            $resultadosubasta = new ResultadoSubastaModel();
            $result = $resultadosubasta->get($param);
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }

    public function getResultadosBySubasta($param)
    {       
        $response = new Response();
        $puja = new PujaModel();
    try {
        

        $result = $puja->getPujasbySubasta($param);

        if (!is_array($result)) {
            $result = [];
        }

        $response->toJSON([
            "success" => true,
            "status" => 200,
            "message" => empty($result) ? "Sin pujas aún" : "Solicitud exitosa",
            "data" => $result
        ]);

    } catch (Exception $e) {
        $response->toJSON([
            "success" => false,
            "status" => 500,
            "message" => "Error interno",
            "data" => []
        ]);
    }
}
    
}