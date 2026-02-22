<?php
class estadopago
{
    public function index()
    {
        try {
            $response = new Response();
            //Obtener el listado del Modelo
            $estadopago = new EstadoPagoModel();
            $result = $estadopago->all();
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
            $estadopago = new EstadoPagoModel();
            $result = $estadopago->get($param);
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }
}