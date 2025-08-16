import React from "react";
import { TILES, BOARD_SIZE } from "../mock";
import { Card } from "../components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip";

const tileColors = {
  start: "bg-emerald-700 text-white",
  rio: "bg-emerald-200 text-emerald-900",
  mercado: "bg-amber-200 text-amber-900",
  campamento: "bg-lime-200 text-lime-900",
  peligro: "bg-rose-200 text-rose-900",
  tesoro: "bg-yellow-200 text-yellow-900",
  evento: "bg-cyan-200 text-cyan-900",
};

export default function GameBoard({ players, onTileClick }) {
  // Build a map of tile index to players on that tile
  const playersByPos = players.reduce((acc, p) => {
    const arr = acc[p.position] || [];
    arr.push(p);
    acc[p.position] = arr;
    return acc;
  }, {});

  return (
    <Card className="p-3 bg-gradient-to-br from-emerald-50 to-emerald-100 shadow-sm">
      <div className="text-sm font-medium text-emerald-900 mb-2">Tablero - Expedición Amazónica</div>
      <div
        className="grid gap-1"
        style={{ gridTemplateColumns: `repeat(${BOARD_SIZE}, minmax(0, 1fr))` }}
      >
        {TILES.map((t) => (
          <TooltipProvider key={t.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className={`relative h-16 rounded-md border border-emerald-300 flex items-center justify-center ${
                    tileColors[t.type] || "bg-slate-100"
                  }`}
                  onClick={() => onTileClick?.(t)}
                >
                  <span className="text-xs font-semibold select-none">{t.label}</span>
                  {/* Players on this tile */}
                  {playersByPos[t.id] && (
                    <div className="absolute bottom-1 left-1 right-1 flex gap-1 justify-center">
                      {playersByPos[t.id].map((p) => (
                        <span
                          key={p.id}
                          title={p.name}
                          className="w-3 h-3 rounded-full border border-black/20"
                          style={{ backgroundColor: p.color }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-white text-emerald-900 border-emerald-200">
                <div className="text-xs">
                  <div className="font-semibold">Casilla #{t.id}</div>
                  <div>Tipo: {t.type}</div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </Card>
  );
}