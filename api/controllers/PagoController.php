<?php
class pago
{
    public function index()
    {
        try {
            $response = new Response();
            //Obtener el listado del Modelo
            $pago = new PagoModel();
            $result = $pago->all();
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
            $pago = new PagoModel();
            $result = $pago->get($param);
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }

   public function getPagoBySubasta($param)
{
    try {
        $response = new Response();
        $pagoModel = new PagoModel();

        $result = $pagoModel->getPagoBySubasta($param);

        if (!$result) {
            $response->toJSON([
                "success" => false, 
                "status" => 404,
                "message" => "No se encontró pago para esta subasta.",
                "data" => null
            ]);
            return;
        }

        $response->toJSON([
            "success" => true,
            "status" => 200,
            "message" => "Solicitud exitosa",
            "data" => $result
        ]);

    } catch (Exception $e) {
        $response->toJSON([
            "success" => false,
            "status" => 500,
            "message" => "Error interno",
            "data" => null
        ]);
        handleException($e);
    }
}
    public function create()
    {
        try {
            $request = new Request();
            $response = new Response();

            // Obtener JSON enviado
            $inputJSON = $request->getJSON();

            // Instancia del modelo
            $pago = new PagoModel();

            // Acción del modelo a ejecutar
            $result = $pago->create($inputJSON);

            // Respuesta
            $response->toJSON([
                "success" => true,
                "status" => 200,
                "message" => "Pago registrado",
                "data" => $result
            ]);

        } catch (Exception $e) {
            $response->toJSON([
                "success" => false,
                "status" => 500,
                "message" => "Error al registrar el pago",
                "data" => null
            ]);
            handleException($e);
        }
    }
    
    
}