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
    
}