import React, { useEffect, useMemo, useState } from "react";
import "./index.css";
import GameBoard from "./components/GameBoard";
import ControlPanel from "./components/ControlPanel";
import ARScene from "./components/ARScene";
import {
  createInitialState,
  loadState,
  saveState,
  rollDice,
  applyTileEffects,
  clampPosition,
  nextPlayerIndex,
  TILES,
} from "./mock";
import { useToast } from "./hooks/use-toast";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { Users } from "lucide-react";
import { Toaster } from "./components/ui/toaster";

function usePersistentState() {
  const initial = useMemo(() => loadState() || createInitialState(["Arara", "Jaguar"]), []);
  const [state, setState] = useState(initial);
  useEffect(() => {
    saveState(state);
  }, [state]);
  return [state, setState];
}

function Header() {
  return (
    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-emerald-800 to-emerald-600 text-white">
      <div className="font-bold tracking-wide">Reto del Amazonas — MVP</div>
      <div className="text-xs opacity-90">Modo: Pass &amp; Play (prototipo con WebXR)</div>
    </div>
  );
}

export default function App() {
  const { toast } = useToast();
  const [state, setState] = usePersistentState();
  const [showAR, setShowAR] = useState(false);

  const onTileClick = (tile) => {
    // Could show context or preview; for now do nothing
  };

  const handleRoll = () => {
    const val = rollDice();
    setState((prev) => {
      const players = [...prev.players];
      const p = { ...players[prev.activeIdx] };
      let newPos = clampPosition(p.position + val);
      p.position = newPos;
      const tile = TILES[newPos];
      const { player: updated, message, extraMove } = applyTileEffects(p, tile);
      let finalPos = p.position;
      if (extraMove) {
        finalPos = clampPosition(p.position + extraMove);
        updated.position = finalPos;
      }
      players[prev.activeIdx] = updated;
      const reachedEnd = finalPos >= TILES.length - 1;
      let finalMessage = message;
      if (reachedEnd) {
        finalMessage = `${updated.name} alcanzó la meta del río. ¡Victoria!`;
      }
      return { ...prev, players, lastRoll: val, message: finalMessage };
    });
  };

  const handleEndTurn = () => {
    setState((prev) => {
      const next = nextPlayerIndex(prev.activeIdx, prev.players.length);
      return { ...prev, activeIdx: next, lastRoll: null };
    });
    const nextPlayer = state.players[nextPlayerIndex(state.activeIdx, state.players.length)];
    toast({ title: "Siguiente turno", description: `Pasa el teléfono a ${nextPlayer.name}.` });
  };

  const handleReset = () => {
    setState(createInitialState(state.players.map((p) => p.name)));
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      <Header />
      <main className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
        <section className="lg:col-span-2">
          <GameBoard players={state.players} onTileClick={onTileClick} />
        </section>
        <aside className="lg:col-span-1">
          {!showAR && (
            <ControlPanel
              state={{ ...state, arEnabled: showAR }}
              onRoll={handleRoll}
              onEndTurn={handleEndTurn}
              onToggleAR={() => setShowAR((s) => !s)}
              onReset={handleReset}
            />
          )}

          <Card className="p-3 mt-3">
            <div className="text-sm font-medium text-emerald-900 mb-2 flex items-center gap-2">
              <Users className="w-4 h-4" /> Jugadores
            </div>
            <ul className="space-y-2">
              {state.players.map((p, idx) => (
                <li key={p.id} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full border" style={{ background: p.color }} />
                    {p.name} {idx === state.activeIdx && (
                      <span className="ml-1 text-xs text-emerald-700">(turno)</span>
                    )}
                  </span>
                  <span className="text-xs text-emerald-700">Casilla {p.position}</span>
                </li>
              ))}
            </ul>
          </Card>
        </aside>
      </main>

      {showAR && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 40 }}>
          <ARScene gameState={state} onClose={() => setShowAR(false)} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 100, padding: '1rem' }}>
            <ControlPanel
              state={{ ...state, arEnabled: showAR }}
              onRoll={handleRoll}
              onEndTurn={handleEndTurn}
              onToggleAR={() => setShowAR((s) => !s)}
              onReset={handleReset}
            />
          </div>
        </div>
      )}
      <Toaster />
    </div>
  );
}