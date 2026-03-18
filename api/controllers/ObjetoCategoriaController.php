<?php
class objetocategoria
{
    public function index()
    {
        try {
            $response = new Response();
            //Obtener el listado del Modelo
            $objetocate = new ObjetoCategoriaModel();
            $result = $objetocate->GetAllObjetoCategoria();
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }

}