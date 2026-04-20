<?php
class SubastaModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }

    /*Listar */
    public function all()
    {
        $obj    = new ObjetoModel();
        $estSub = new EstadoSubastaModel();
        $puj    = new PujaModel();

        $vSql = "SELECT * FROM subasta order by idSubasta desc";
        $vResultado = $this->enlace->ExecuteSQL($vSql);

        if (!empty($vResultado) && is_array($vResultado)) {
            for ($i = 0; $i < count($vResultado); $i++) {
                $sub = $vResultado[$i];
                $sub->objeto        = $obj->get((int)$sub->idObjeto);
                $sub->estadosubasta = $estSub->get((int)$sub->idEstadoSubasta)->Descripcion;
                $sub->CantidadPujas = $puj->contarPujasbySubasta((int)$sub->idSubasta);
            }
        }

        return $vResultado;
    }

    /*Obtener */
    public function get($id)
{
    $obj    = new ObjetoModel();
    $estSub = new EstadoSubastaModel();
    $puj    = new PujaModel();

    $vSql = "SELECT * FROM subasta WHERE idSubasta=$id";
    $vResultado = $this->enlace->ExecuteSQL($vSql);
    $vResultado = $vResultado[0];

    // cierre automático de la subasta si esta finalizada
    if (
        (int)$vResultado->idEstadoSubasta === 3 &&
        strtotime($vResultado->FechaHoraFinal) <= time()
    ) {
        $this->cerrarSubasta((int)$vResultado->idSubasta, $puj);
        $vResultado->idEstadoSubasta = 4;
    }

    $vResultado->objeto        = $obj->get((int)$vResultado->idObjeto);
    $vResultado->estadosubasta = $estSub->get((int)$vResultado->idEstadoSubasta)->Descripcion;
    $vResultado->CantidadPujas = $puj->contarPujasbySubasta((int)$vResultado->idSubasta);

    //cargar el ganador de la subasta si es que existe
    $vResultado->ganador    = null;
    $vResultado->montoFinal = null;

        if ((int)$vResultado->idEstadoSubasta === 4) {
            $resultado = $this->enlace->ExecuteSQL(
                "SELECT r.MontoFinal, r.idUsuario
                FROM resultadosubasta r
                WHERE r.idSubasta = $id
                LIMIT 1"
            );

            if (!empty($resultado)) {
                $usr = new UsuarioModel();
                $usuarioGanador = $usr->get((int)$resultado[0]->idUsuario);
                $vResultado->ganador    = $usuarioGanador->nombreCompleto;
                $vResultado->montoFinal = (float)$resultado[0]->MontoFinal;
            }
        }

        return $vResultado;
    }

    public function allActivas()
    {
        $obj    = new ObjetoModel();
        $estSub = new EstadoSubastaModel();
        $puj    = new PujaModel();

        $vSql = "SELECT * FROM subasta WHERE idEstadoSubasta = 3 order by idSubasta desc;";
        $vResultado = $this->enlace->ExecuteSQL($vSql);

        if (!empty($vResultado) && is_array($vResultado)) {
            for ($i = 0; $i < count($vResultado); $i++) {
                $sub = $vResultado[$i];
                $sub->objeto        = $obj->get((int)$sub->idObjeto);
                $sub->estadosubasta = $estSub->get((int)$sub->idEstadoSubasta)->Descripcion;
                $sub->CantidadPujas = $puj->contarPujasbySubasta((int)$sub->idSubasta);
            }
        }

        return $vResultado;
    }

    public function allFinalizadas()
    {
        $obj    = new ObjetoModel();
        $estSub = new EstadoSubastaModel();
        $puj    = new PujaModel();

        $vSql = "SELECT * FROM subasta WHERE idEstadoSubasta = 4 order by idSubasta desc;";
        $vResultado = $this->enlace->ExecuteSQL($vSql);

        if (!empty($vResultado) && is_array($vResultado)) {
            for ($i = 0; $i < count($vResultado); $i++) {
                $sub = $vResultado[$i];
                $sub->objeto        = $obj->get((int)$sub->idObjeto);
                $sub->estadosubasta = $estSub->get((int)$sub->idEstadoSubasta)->Descripcion;
                $sub->CantidadPujas = $puj->contarPujasbySubasta((int)$sub->idSubasta);
            }
        }

        return $vResultado;
    }

    public function getSubastaByObjeto($idObjeto)
    {
        $estSub = new EstadoSubastaModel();
        $puj    = new PujaModel();

        $vSql = "SELECT * FROM subasta WHERE idObjeto=$idObjeto order by idSubasta desc";
        $vResultado = $this->enlace->ExecuteSQL($vSql);

        if (!empty($vResultado) && is_array($vResultado)) {
            for ($i = 0; $i < count($vResultado); $i++) {
                $sub = $vResultado[$i];
                $sub->estadosubasta = $estSub->get((int)$sub->idEstadoSubasta)->Descripcion;
                $sub->CantidadPujas = $puj->contarPujasbySubasta((int)$sub->idSubasta);
            }
        }

        return $vResultado;
    }

    public function contarSubastabyUsuario(int $idUsuario): int
    {
        $sql = "SELECT COUNT(*) AS totalSubastas
                FROM subasta
                WHERE idObjeto IN (
                    SELECT idObjeto
                    FROM objeto
                    WHERE idUsuario = $idUsuario
                );";
        $rows = $this->enlace->ExecuteSQL($sql);
        return $rows ? (int)$rows[0]->totalSubastas : 0;
    }

    public function create($subasta)
    {
        $idEstadoSubasta = 5; // Borrador

        $sql = "INSERT INTO subasta
                (idObjeto, PrecioInicial, Incremento, FechaHoraInicio, FechaHoraFinal, idEstadoSubasta)
                VALUES
                (
                    $subasta->idObjeto,
                    $subasta->PrecioInicial,
                    $subasta->Incremento,
                    '$subasta->FechaHoraInicio',
                    '$subasta->FechaHoraFinal',
                    $idEstadoSubasta
                )";

        $idSubasta = $this->enlace->executeSQL_DML_last($sql);
        return $this->get($idSubasta);
    }

    public function update($subasta)
    {
        $sql = "UPDATE subasta SET
                idObjeto        = '$subasta->idObjeto',
                PrecioInicial   = '$subasta->PrecioInicial',
                Incremento      = '$subasta->Incremento',
                FechaHoraInicio = '$subasta->FechaHoraInicio',
                FechaHoraFinal  = '$subasta->FechaHoraFinal',
                idEstadoSubasta = '$subasta->idEstadoSubasta'
                WHERE idSubasta = $subasta->idSubasta";

        $this->enlace->executeSQL_DML($sql);
        return $this->get($subasta->idSubasta);
    }

    // metodo para cerrar la subastsa 
    private function cerrarSubasta(int $idSubasta, PujaModel $pujModel): void
    {
        // 1. Cambiar estado a Finalizada (4)
        $this->enlace->executeSQL_DML(
            "UPDATE subasta SET idEstadoSubasta = 4 WHERE idSubasta = $idSubasta"
        );

        // 2. Buscar la puja ganadora (ya vienen ordenadas DESC por idPuja)
        $pujas = $pujModel->getPujasbySubasta($idSubasta);

        if (!empty($pujas)) {
            $ganadora      = $pujas[0];
            $idGanador     = (int)$ganadora->idUsuario;
            $montoFinal    = (float)$ganadora->MontoOfertado;
            $nombreGanador = $ganadora->usuario;

            // 3. Guardar en resultadosubasta (solo si no existe ya)
            $existe = $this->enlace->ExecuteSQL(
                "SELECT idResultadoSubasta FROM resultadosubasta 
                WHERE idSubasta = $idSubasta"
            );

            if (empty($existe)) {
                $this->enlace->executeSQL_DML(
                    "INSERT INTO resultadosubasta (idSubasta, idUsuario, MontoFinal)
                    VALUES ($idSubasta, $idGanador, $montoFinal)"
                );
            }

            // 4. Notificar a Ably con ganador
            AblyHelper::publicar(
                "subasta-$idSubasta",
                "subasta-cerrada",
                [
                    'idSubasta'  => $idSubasta,
                    'ganador'    => $nombreGanador,
                    'idGanador'  => $idGanador,
                    'montoFinal' => $montoFinal,
                    'estado'     => 'Finalizada',
                    'timestamp'  => AblyHelper::ahora()
                ]
            );

        } else {
            // Sin pujas: solo notificar cierre sin ganador
            AblyHelper::publicar(
                "subasta-$idSubasta",
                "subasta-cerrada",
                [
                    'idSubasta'  => $idSubasta,
                    'ganador'    => null,
                    'montoFinal' => null,
                    'estado'     => 'Finalizada',
                    'timestamp'  => AblyHelper::ahora()
                ]
            );
        }
    }
}