<?php
class condicion
{
    public function index()
    {
        try {
            $response = new Response();
            //Obtener el listado del Modelo
            $condicion = new CondicionModel();
            $result = $condicion->all();
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
            $condicion = new CondicionModel();
            $result = $condicion->get($param);
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }
}