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

    public function getResultadoBySubasta($param)
{       
    $response = new Response();
    $resultadosubasta = new ResultadoSubastaModel();

    try {

        $result = $resultadosubasta->getResultadoBySubasta($param);

        $response->toJSON([
            "success" => true,
            "status" => 200,
            "message" => $result ? "Solicitud exitosa" : "Sin resultado aún",
            "data" => $result
        ]);

    } catch (Exception $e) {

        $response->toJSON([
            "success" => false,
            "status" => 500,
            "message" => "Error interno",
            "data" => null
        ]);
    }
}

public function create()
{
    try {
        $request = new Request();
        $response = new Response();

        $inputJSON = $request->getJSON();

        $resultadosubasta = new ResultadoSubastaModel();

        // Verificar que no exista ya un resultado para esta subasta
        $existente = $resultadosubasta->getResultadoBySubasta((int)$inputJSON->idSubasta);
        if ($existente) {
            $response->toJSON([
                "success" => false,
                "status" => 409,
                "message" => "Ya existe un resultado para esta subasta."
            ]);
            return;
        }

        $result = $resultadosubasta->create($inputJSON);

        $response->toJSON([
            "success" => true,
            "status" => 201,
            "message" => "Resultado registrado correctamente.",
            "data" => $result
        ]);

    } catch (Exception $e) {
        $response->toJSON($result);
        handleException($e);
    }
}
    
}