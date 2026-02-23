<?php
//class Genre
class imagen{
    //POST Crear
    public function create()
    {
        try {
            $request = new Request();
            $response = new Response();
            //Obtener json enviado
            $inputFILE = $request->getBody();
            //Instancia del modelo
            $imagen = new ImagenModel();
            //Acción del modelo a ejecutar
            $result = $imagen->uploadFile($inputFILE);
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }

public function index()
    {
        try {
            $response = new Response();
            //Obtener el listado del Modelo
            $imagen = new ImagenModel();
            $result = $imagen->all();
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }

    public function get($id)
    {
        try {
            $response = new Response();
            $imagen = new ImagenModel();
            $result = $imagen->getImagenObjeto($id);
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }
}