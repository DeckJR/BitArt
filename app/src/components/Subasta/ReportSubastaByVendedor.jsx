import { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown } from "lucide-react";
import SubastaService from "@/services/SubastaService";

export function ReportSubastaByVendedor() {
const [data, setData] = useState([]);
const [orden, setOrden] = useState("desc");
const [error, setError] = useState(null);
const [loading, setLoading] = useState(true);

  // 🎨 Variables del tema
const axisColor = "var(--color-muted-foreground)";
const gridColor = "var(--color-border)";
const tooltipBg = "var(--color-card)";
const tooltipText = "var(--color-foreground)";
const barColor = "#753532";

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await SubastaService.reporteSubastaByVendedor();
            const result = response.data;
            if (result.success) {
            setData(Array.isArray(result.data) ? result.data : []);
            } else {
            setError(result.message || "Error desconocido");
            }
        } catch (err) {
            setError(err.message || "Error al conectar con el servidor");
        } finally {
            setLoading(false);
        }
        };
        fetchData();
    }, []);

    if (loading)
        return (
        <div className="flex justify-center items-center h-64 text-muted-foreground">
            Cargando reporte...
        </div>
        );

    if (error)
        return (
        <div className="text-center text-destructive font-medium mt-10">
            Error: {error}
        </div>
        );

    const chartData = [...data]
        .map((item) => ({
        vendedor: item.vendedor,
        total: Number(item.total),
        }))
        .sort((a, b) =>
        orden === "desc" ? b.total - a.total : a.total - b.total
        );

    return (
        <Card className="bg-card border border-border shadow-md">
        <CardHeader>
            <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-foreground">
                Subastas por Vendedor
            </CardTitle>

            <Button
                variant="outline"
                size="sm"
                onClick={() => setOrden((o) => (o === "desc" ? "asc" : "desc"))}
                className="flex items-center gap-1 text-foreground border-border hover:bg-muted"
            >
                {orden === "desc" ? (
                <>
                    <ArrowDown className="w-4 h-4" /> Mayor a menor
                </>
                ) : (
                <>
                    <ArrowUp className="w-4 h-4" /> Menor a mayor
                </>
                )}
            </Button>
            </div>
        </CardHeader>

        <CardContent>
            {/* 📊 GRÁFICO */}
            <div className="w-full h-[400px]">
            <ResponsiveContainer>
                <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                >
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />

                <XAxis
                    dataKey="vendedor"
                    stroke={axisColor}
                    tick={{ fill: axisColor, fontSize: 12 }}
                    angle={-25}
                    textAnchor="end"
                    interval={0}
                />

                <YAxis
                    stroke={axisColor}
                    tick={{ fill: axisColor }}
                    allowDecimals={false}
                />

                <Tooltip
                    contentStyle={{
                    backgroundColor: tooltipBg,
                    border: "1px solid var(--color-border)",
                    color: tooltipText,
                    }}
                    formatter={(value) => [`${value} subastas`, "Total"]}
                />

                <Legend wrapperStyle={{ color: tooltipText }} />

                <Bar
                    dataKey="total"
                    name="Subastas creadas"
                    fill={barColor}
                    radius={[4, 4, 0, 0]}
                />
                </BarChart>
            </ResponsiveContainer>
            </div>
        </CardContent>
        </Card>
    );
    }