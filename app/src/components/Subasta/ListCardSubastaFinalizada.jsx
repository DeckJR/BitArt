import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Clock, Globe, ShoppingCart, Info, FilmIcon } from "lucide-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

ListCardSubastaFinalizada.propTypes = {
  data: PropTypes.array,
  isInactive: PropTypes.bool.isRequired,
};

export function ListCardSubastaFinalizada({ data, isInactive }) {
  const BASE_URL = import.meta.env.VITE_BASE_URL + "uploads";

  return (
    <div className="grid gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3">
      {data && data.map((item) => (
        <Card key={item.idObjeto} className="flex flex-col overflow-hidden">
          {/* Header */}
          <CardHeader className="text-secondary text-center">
            <CardTitle className="text-lg font-semibold">
              {item.objeto.Nombre}
            </CardTitle>
            <p className="text-sm opacity-80">{item.objeto.Autor}</p>
          </CardHeader>

          {/* Imagen */}
            <div className="relative w-full aspect-video">{item.objeto.imagen ? (
              <img
                src={`${BASE_URL}/${item.objeto.imagen}`}
                alt={item.objeto.Nombre}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-muted flex items-center justify-center text-muted-foreground">
                <FilmIcon className="h-1/2 w-1/2" />
              </div>
            )}
            {isInactive && item.PrecioInicial && (
              <Badge
                variant="secondary"
                className="absolute top-2 right-2 text-base font-bold bg-primary text-primary-foreground"
              >
                ₡{parseFloat(item.PrecioInicial).toFixed(2)}
              </Badge>
            )}
          </div>

          {/* Contenido */}
          <CardContent className="flex-1 space-y-2 pt-4">
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4 text-primary" />
              <b>Fecha Inicio: </b>
              {item.FechaHoraInicio} 
            </p>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Globe className="h-4 w-4 text-secondary" />
              <b>Fecha Final: </b>{item.FechaHoraFinal}
            </p>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4 text-primary" />
              <b>Incremento Min: </b>
              {item.Incremento} 
            </p>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Globe className="h-4 w-4 text-secondary" />
              <b>Cantidad de Pujas </b>{item.CantidadPujas}
            </p>
          </CardContent>

          {/* Acciones */}
          <div className="flex justify-end gap-2 border-t p-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon" className="size-8"
                  >
                    <Link to={`/objeto/detail/${item.idObjeto}`}>
                      <Info />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Ver detalle</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {isInactive && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" className="size-8"
                    >
                      <ShoppingCart />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Agregar al carrito</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}


