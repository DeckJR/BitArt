import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Trash, Contact } from "lucide-react";
import { CustomSelect } from "@/components/ui/custom/custom-select";
import { CustomInputField } from "@/components/ui/custom/custom-input-field";

ActorsForm.propTypes = {
    data: PropTypes.array.isRequired,       // Lista de actores
    control: PropTypes.object.isRequired,   // React Hook Form
    index: PropTypes.number.isRequired,     // Índice del actor
    onRemove: PropTypes.func.isRequired,    // Función para eliminar actor
    disableRemoveButton: PropTypes.bool,    // Deshabilitar botón eliminar
    errors: PropTypes.object,               // Errores del form
};

export function ActorsForm({
    data,
    control,
    index,
    onRemove,
    disableRemoveButton,
    errors
}) {
    return (
        <div className="mb-4 p-4 border rounded-lg shadow-sm flex flex-col md:flex-row items-start md:items-center gap-4">

            {/* Icono de actor */}
            {index+1}.<Contact className="w-6 h-6 text-muted-foreground" />
            {/* Selector de actor */}
            <div className="flex-1 w-full md:w-1/3">
                <Controller
                    name={`actors.${index}.actor_id`}
                    control={control}
                    render={({ field }) => (
                        <CustomSelect
                            field={field}
                            data={data}
                            label="Actor"
                            getOptionLabel={(actor) => `${actor.fname} ${actor.lname}`}
                            getOptionValue={(actor) => actor.id}
                            error={errors?.actors?.[index]?.actor_id.message}
                        />
                    )}
                />
            </div>

            {/* Campo de rol */}
            <div className="flex-1 w-full md:w-1/3">
                <Controller
                    name={`actors.${index}.role`}
                    control={control}
                    render={({ field }) => (
                        <CustomInputField
                            {...field}
                            label="Rol"
                            placeholder="Nombre rol"
                            error={errors?.actors?.[index]?.role.message} />
                    )}
                />
            </div>

            {/* Botón eliminar */}
            <Button
                size="icon"
                disabled={disableRemoveButton}
                onClick={() => onRemove(index)}
                className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
                <Trash className="h-4 w-4" />
            </Button>
        </div>
    );
}