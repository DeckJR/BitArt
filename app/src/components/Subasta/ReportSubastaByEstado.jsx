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
  Cell,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import SubastaService from "@/services/SubastaService";

const ESTADO_COLORS = {
  Cancelado: "#000080",
  Programada: "#FFFF00",
  Abierta: "#00FF00",
  Finalizada: "#FF0000",
  Borrador: "#C0C0C0",
};

export function ReportSubastaByEstado() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const axisColor = "var(--color-muted-foreground)";
  const gridColor = "var(--color-border)";
  const tooltipBg = "var(--color-card)";
  const tooltipText = "var(--color-foreground)";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await SubastaService.reporteSubastaByEstado();
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

  const chartData = data.map((item) => ({
    estado: item.estado,
    total: Number(item.total),
  }));

  return (
    <Card className="bg-card border border-border shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground">
          Subastas por Estado
        </CardTitle>
      </CardHeader>

      <CardContent>
        {/* 📊 GRÁFICO */}
        <div className="w-full h-[400px]">
          <ResponsiveContainer>
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />

              <XAxis
                dataKey="estado"
                stroke={axisColor}
                tick={{ fill: axisColor }}
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
                name="Total de Subastas"
                fill="#A67A53"
                radius={[4, 4, 0, 0]}
              >
                {chartData.map((entry) => (
                  <Cell
                    key={entry.estado}
                    fill={ESTADO_COLORS[entry.estado] ?? "var(--color-muted)"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        
        <div className="flex flex-wrap gap-4 mt-6 justify-center">
          {chartData.map((item) => (
            <div
              key={item.estado}
              className="flex flex-col items-center px-4 py-2 rounded-lg bg-muted"
            >
              <span className="text-2xl font-bold text-foreground">
                {item.total}
              </span>

              <span className="text-sm text-muted-foreground">
                {item.estado}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}