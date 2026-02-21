<?php
class estadousuario
{
    public function index()
    {
        try {
            $response = new Response();
            //Obtener el listado del Modelo
            $estadousuario = new EstadoUsuarioModel();
            $result = $estadousuario->all();
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
            $estadousuario = new EstadoUsuarioModel();
            $result = $estadousuario->get($param);
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }
}