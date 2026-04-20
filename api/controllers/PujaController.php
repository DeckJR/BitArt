<?php
class puja
{
    public function index()
    {
        try {
            $response = new Response();
            $puja = new PujaModel();
            $result = $puja->all();
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

            if (!is_array($result)) {
                $result = [];
            }

            $response->toJSON([
                "success" => true,
                "status"  => 200,
                "message" => empty($result) ? "Sin pujas aún" : "Solicitud exitosa",
                "data"    => $result
            ]);

        } catch (Exception $e) {
            $response = new Response();
            $response->toJSON([
                "success" => false,
                "status"  => 500,
                "message" => "Error interno",
                "data"    => []
            ]);
        }
    }

    public function getPujasByUsuario($param)
    {
        try {
            $response = new Response();
            $puja = new PujaModel();
            $result = $puja->getPujasbyUsuario($param);
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
                'success'    => true,
                'subasta_id' => $param,
                'totalPujas' => $result ?? 0
            ]);

        } catch (Exception $e) {
            $response = new Response();
            $response->toJSON([
                'success'    => false,
                'error'      => $e->getMessage(),
                'totalPujas' => 0
            ]);
        }
    }

    public function create()
    {
        try {
            $request  = new Request();
            $response = new Response();

            $inputJSON = $request->getJSON();

            $puja   = new PujaModel();
            $result = $puja->create($inputJSON);

            // ABLY publica la nueva puja a todos los clientes
            AblyHelper::publicar(
                "subasta-{$result->idSubasta}",
                "nueva-puja",
                [
                    'idPuja'        => (int)$result->idPuja,
                    'idUsuario'     => (int)$result->idUsuario,
                    'usuario'       => $result->usuario,
                    'MontoOfertado' => (float)$result->MontoOfertado,
                    'FechaHora'     => $result->FechaHora,
                ]
            );

            $response->toJSON([
                "success" => true,
                "status"  => 200,
                "message" => "Puja creada",
                "data"    => $result
            ]);

        } catch (Exception $e) {
            $response = new Response();
            $response->toJSON([
                "success" => false,
                "status"  => 500,
                "message" => $e->getMessage()
            ]);
        }
    }
}