import React from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Dice5, Camera, RotateCcw, CheckCircle, Flag } from "lucide-react";

export default function ControlPanel({
  state,
  onRoll,
  onEndTurn,
  onToggleAR,
  onReset,
}) {
  const player = state.players[state.activeIdx];

  return (
    <Card className="p-4 bg-white/70 backdrop-blur border-emerald-200">
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="text-xs text-emerald-700">Turno de</div>
          <div className="text-lg font-bold" style={{ color: player.color }}>{player.name}</div>
        </div>
        <Button variant="outline" onClick={onToggleAR} className="gap-2 border-emerald-300">
          <Camera className="w-4 h-4" /> {state.arEnabled ? "Salir AR" : "Modo AR"}
        </Button>
      </div>

      <Tabs defaultValue="panel" className="w-full">
        <TabsList className="grid grid-cols-3 mb-2 bg-emerald-50 border border-emerald-200">
          <TabsTrigger value="panel">Panel</TabsTrigger>
          <TabsTrigger value="recursos">Recursos</TabsTrigger>
          <TabsTrigger value="ayuda">Ayuda</TabsTrigger>
        </TabsList>
        <TabsContent value="panel">
          <div className="flex items-center gap-2">
            <Button onClick={onRoll} className="bg-emerald-700 hover:bg-emerald-800 gap-2">
              <Dice5 className="w-4 h-4" /> Lanzar dado
            </Button>
            <Button variant="secondary" onClick={onEndTurn} className="gap-2">
              <CheckCircle className="w-4 h-4" /> Fin de turno
            </Button>
            <Button variant="ghost" onClick={onReset} className="gap-2 text-rose-700 hover:text-rose-800">
              <RotateCcw className="w-4 h-4" /> Reiniciar
            </Button>
          </div>
          <div className="mt-3 text-sm text-emerald-900">
            {state.lastRoll ? (
              <div>
                Lanzaste: <span className="font-semibold">{state.lastRoll}</span>
              </div>
            ) : (
              <div>Usa el dado para avanzar por el Amazonas.</div>
            )}
            {state.message && (
              <div className="mt-2 p-2 rounded bg-emerald-50 border border-emerald-200">{state.message}</div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="recursos">
          <div className="space-y-2 text-sm">
            <Stat label="Energía" value={player.energia} max={5} color="bg-emerald-600" />
            <Stat label="Agua" value={player.agua} max={5} color="bg-cyan-600" />
            <Stat label="Oro" value={player.oro} max={10} color="bg-amber-600" />
          </div>
        </TabsContent>
        <TabsContent value="ayuda" className="text-sm text-emerald-900">
          • Avanza por el río y sobrevive a la selva.
          <br />• Mercado: cambia oro por agua/energía.
          <br />• Campamento: recupera energía.
          <br />• Peligro/Evento: efectos especiales.
          <div className="mt-2 inline-flex items-center gap-1 text-emerald-700"><Flag className="w-4 h-4" /> Gana quien llegue primero al final.</div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}

function Stat({ label, value, max, color }) {
  const percent = Math.min(100, Math.round((value / max) * 100));
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span>{label}</span>
        <span className="text-emerald-700">{value}/{max}</span>
      </div>
      <Progress value={percent} className="h-2" indicatorClassName={color} />
    </div>
  );
}