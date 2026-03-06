import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import {  ShoppingCart, Info, FilmIcon } from "lucide-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

ListCardObjeto.propTypes = {
    data: PropTypes.array,
    isPintura: PropTypes.bool.isRequired,
};

export function ListCardObjeto({ data, isPintura }) {
    const BASE_URL = import.meta.env.VITE_BASE_URL + "uploads";

    return (
        <div className="grid gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3">
        {data && data.map((item) => (
            <Card key={item.idObjeto} className="flex flex-col overflow-hidden">
            {/* Header */}
            
            <CardHeader className="text-secondary text-center">
                <CardTitle className="text-lg font-semibold">
                {item.Nombre}
                </CardTitle>
                <p className="text-sm opacity-80">{item.Autor}</p>
            </CardHeader>

            {/* Imagen */}
                <div className="relative w-full h-100 overflow-hidden ">{item.imagen ? (
                <img
                    src={` ${BASE_URL}/${item.imagen}`}
                    alt={item.Nombre}
                    className="h-full w-full object-cover"
                />
                ) : (
                <div className="h-full w-full bg-muted flex items-center justify-center text-muted-foreground">
                    <FilmIcon className="h-1/2 w-1/2" />
                </div>
                )}
            </div>

            {/* Contenido */}
         

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

                {isPintura && (
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