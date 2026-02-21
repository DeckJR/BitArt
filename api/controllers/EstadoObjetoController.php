<?php
class estadoobjeto
{
    public function index()
    {
        try {
            $response = new Response();
            //Obtener el listado del Modelo
            $estadoobjeto = new EstadoObjetoModel();
            $result = $estadoobjeto->all();
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
            $estadoobjeto = new EstadoObjetoModel();
            $result = $estadoobjeto->get($param);
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }
}