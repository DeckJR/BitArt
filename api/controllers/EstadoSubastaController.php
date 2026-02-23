<?php
class estadosubasta
{
    public function index()
    {
        try {
            $response = new Response();
            //Obtener el listado del Modelo
            $estadosubasta = new EstadoSubastaModel();
            $result = $estadosubasta->all();
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
            $estadosubasta = new EstadoSubastaModel();
            $result = $estadosubasta->get($param);
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }
}