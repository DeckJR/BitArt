<?php
class usuario
{
    public function index()
    {
        try {
            $response = new Response();
            //Obtener el listado del Modelo
            $usuario = new UsuarioModel();
            $result = $usuario->all();
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
            $usuario = new UsuarioModel();
            $result = $usuario->get($param);
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }



    public function loginUsuario()
{
    $response = new Response();
    $request = new Request();

    $inputJSON = $request->getJSON();

    if (!$inputJSON) {
        http_response_code(400);
        $response->toJSON(["message" => "No llegó JSON"]);
        return;
    }

    $usuario = new UsuarioModel();
    $result = $usuario->login($inputJSON);

    if ($result) {
        $response->toJSON($result);
    } else {
        http_response_code(401);
        $response->toJSON([
            "message" => "Usuario no valido"
        ]);
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
            $usuario = new UsuarioModel();
            //Acción del modelo a ejecutar
            $result = $usuario->update($inputJSON);
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }
    public function create()
    {
        $response = new Response();
        $request = new Request();
        //Obtener json enviado
        $inputJSON = $request->getJSON();
        $usuario = new UsuarioModel();
        $result = $usuario->create($inputJSON);
        //Dar respuesta
        $response->toJSON($result);
    }    
}
