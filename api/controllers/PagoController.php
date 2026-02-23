<?php
class pago
{
    public function index()
    {
        try {
            $response = new Response();
            //Obtener el listado del Modelo
            $pago = new PagoModel();
            $result = $pago->all();
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
            $pago = new PagoModel();
            $result = $pago->get($param);
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }

    public function getPagobySubasta($param)
    {
        try {
            $response = new Response();
            $pago = new PagoModel();
            $result = $pago->getPagobySubasta($param);
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }
    
}