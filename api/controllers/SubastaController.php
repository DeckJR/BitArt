<?php
class subasta
{
    public function index()
    {
        try {
            $response = new Response();
            //Obtener el listado del Modelo
            $subasta = new SubastaModel();
            $result = $subasta->all();
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
            $subasta = new SubastaModel();
            $result = $subasta->get($param);
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }
    public function getSubastaByObjeto($param)
    {
        try {
            $response = new Response();
            $subasta = new SubastaModel();
            $result = $subasta->getSubastaByObjeto($param);
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }
    
    public function contarSubastabyUsuario($param)
    {
        try {
            $response = new Response();
            $subasta = new SubastaModel();
            $result = $subasta->contarSubastabyUsuario($param);
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }
    
}