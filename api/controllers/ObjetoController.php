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

    public function getObjetoByUsuario($id)
    {
        try {
            $response = new Response();
            //Obtener el listado del Modelo
            $objeto = new  ObjetoModel();
            $result = $objeto->getObjetoByUsuario($id);
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }

    public function create()
    {
        try {
            $request = new Request();
            $response = new Response();
            //Obtener json enviado
            $inputJSON = $request->getJSON();
            //Instancia del modelo
            $objeto = new ObjetoModel();
            //Acción del modelo a ejecutar
            $result = $objeto->create($inputJSON);
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }

    public function update()
    {
        try {
            $request = new Request();
            $response = new Response();
            //Obtener json enviado
            $inputJSON = $request->getJSON();
            //Instancia del modelo
            $objeto = new ObjetoModel();
            //Acción del modelo a ejecutar
            $result = $objeto->update($inputJSON);
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }
}