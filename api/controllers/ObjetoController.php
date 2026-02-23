<?php
class objeto
{
    public function index()
    {
        try {
            $response = new Response();
            //Obtener el listado del Modelo
            $objeto = new  ObjetoModel();
            $result = $objeto->all();
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
            $objeto = new ObjetoModel();
            $result = $objeto->get($param);
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }
}