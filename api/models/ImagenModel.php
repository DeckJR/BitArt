<?php
class ImagenModel
{
    private $upload_path = 'uploads/';
    private $valid_extensions = array('jpeg', 'jpg', 'png', 'gif');

    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }

    public function all()
    {
        //Consulta sql
        $vSql = "SELECT * FROM imagen order by idImagen desc";
        //Ejecutar la consulta
        $vResultado = $this->enlace->ExecuteSQL($vSql);

        // Retornar el objeto
        return $vResultado;
    }



    //Obtener una imagen de una pelicula
    public function getImagenObjeto($idObjeto)
    {
        //Consulta sql
        $vSql = "SELECT * FROM imagen where idObjeto=$idObjeto";

        //Ejecutar la consulta
        $vResultado = $this->enlace->ExecuteSQL($vSql);
        if (!empty($vResultado)) {
            // Retornar el objeto
            return $vResultado[0];
        }
        return $vResultado;
    }

    public function uploadFile($object)
        {
            $file = $object['file'];
            $idObjeto = $object['idObjeto'];
            //Obtener la información del archivo
            $fileName = $file['name'];
            $tempPath = $file['tmp_name'];
            $fileSize = $file['size'];
            $fileError = $file['error'];

            if (!empty($fileName)) {
                //Crear un nombre único para el archivo
                $fileExt = explode('.', $fileName);
                $fileActExt = strtolower(end($fileExt));
                $safeName = preg_replace('/[^a-zA-Z0-9]/', '', $fileName);
                $fileName = $safeName . "-" . uniqid() . "." . $fileActExt;             
            if (in_array($fileActExt, $this->valid_extensions)) {
                    //Validar que no exista
                    if (!file_exists($this->upload_path . $fileName)) {
                        //Validar que no sobrepase el tamaño
                        if ($fileSize < 2000000 && $fileError == 0) {
                            //Moverlo a la carpeta del servidor del API
                            if (move_uploaded_file($tempPath, $this->upload_path . $fileName)) {
                                //Guardarlo en la BD
                                $sql = "INSERT INTO imagen (idObjeto,imagen) VALUES ($idObjeto, '$fileName')";
                                $vResultado = $this->enlace->executeSQL_DML($sql);
                                if ($vResultado > 0) {
                                    return 'Imagen creada';
                                }
                                return false;
                            }
                        }
                    }
                }
            }
        }
}