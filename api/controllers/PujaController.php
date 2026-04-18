<?php
class puja
{
    public function index()
    {
        try {
            $response = new Response();
            //Obtener el listado del Modelo
            $puja = new PujaModel();
            $result = $puja->all();
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
            $puja = new PujaModel();
            $result = $puja->get($param);
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }
    public function getPujasBySubasta($param)
{
    try {
        $response = new Response();
        $puja = new PujaModel();

        $result = $puja->getPujasbySubasta($param);

        // 🔥 asegurar array plano
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
    public function getPujasByUsuario($param)
    {
        try {
            $response = new Response();
            $puja = new PujaModel();
            $result = $puja->getPujasbyUsuario($param);
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }
    public function ContarPujasByUsuario($param)
    {
        try {
            $response = new Response();
            $puja = new PujaModel();
            $result = $puja->contarPujasbyUsuario($param);
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }
   public function ContarPujasBySubasta($param)
{
    try {
        $response = new Response();
        $puja = new PujaModel();
        $result = $puja->contarPujasbySubasta($param);
        
        $response->toJSON([
            'success' => true,
            'subasta_id' => $param,
            'totalPujas' => $result ?? 0
        ]);
        
    } catch (Exception $e) {
        $response = new Response();
        $response->toJSON([
            'success' => false,
            'error' => $e->getMessage(),
            'totalPujas' => 0  // ← IMPORTANTE: 0 por defecto
        ]);
    }
}
 public function create()
    {
        try {
            $request = new Request();
            $response = new Response();
            //Obtener json enviado
            $inputJSON = $request->getJSON();
            //Instancia del modelo
            $puja = new PujaModel();
            //Acción del modelo a ejecutar
            $result = $puja->create($inputJSON);
            //Dar respuesta
            $response->toJSON([
                "success" => true,
                "status" => 200,
                "message" => "Puja creada",
                "data" => $result
            ]);        
} catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }
}