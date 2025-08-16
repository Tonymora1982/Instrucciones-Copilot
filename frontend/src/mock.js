/* Mock data and helpers for "Reto del Amazonas" pass-and-play board game (frontend-only).
   All data here will later map to backend schemas.
*/

// Colors for players/tokens
export const PLAYER_COLORS = [
  "#065f46", // emerald-800
  "#92400e", // amber-800
  "#1e3a8a", // blue-800
  "#7c2d12"  // orange-900
];

// Path board 6x6 snake path coordinates (row, col)
export const BOARD_SIZE = 6;
export const PATH = Array.from({ length: BOARD_SIZE }, (_, r) => r).reduce(
  (acc, row) => {
    const cols = Array.from({ length: BOARD_SIZE }, (_, c) => c);
    const segment = row % 2 === 0 ? cols : cols.slice().reverse();
    segment.forEach((col) => acc.push([row, col]));
    return acc;
  },
  []
);

// Tile definitions along the path
const TILE_TYPES = ["start", "rio", "mercado", "campamento", "peligro", "tesoro", "evento"];

export const TILES = PATH.map((coord, idx) => {
  if (idx === 0) return { id: idx, type: "start", label: "Inicio", coord };
  // Pattern: every 5th is evento, 7th peligro, 9th mercado, 11th campamento, 13th tesoro, else rio
  if (idx % 13 === 0) return { id: idx, type: "tesoro", label: "Tesoro", coord };
  if (idx % 11 === 0) return { id: idx, type: "campamento", label: "Campamento", coord };
  if (idx % 9 === 0) return { id: idx, type: "mercado", label: "Mercado", coord };
  if (idx % 7 === 0) return { id: idx, type: "peligro", label: "Peligro", coord };
  if (idx % 5 === 0) return { id: idx, type: "evento", label: "Evento", coord };
  return { id: idx, type: "rio", label: "Río", coord };
});

// Simple event deck
export const EVENT_DECK = [
  { id: "e1", title: "Lluvia Torrencial", desc: "Pierdes 1 energía.", effect: (p) => ({ ...p, energia: Math.max(0, p.energia - 1) }) },
  { id: "e2", title: "Guía Local", desc: "Ganas 1 agua.", effect: (p) => ({ ...p, agua: p.agua + 1 }) },
  { id: "e3", title: "Fauna Curiosa", desc: "Nada ocurre.", effect: (p) => p },
  { id: "e4", title: "Corriente Favorable", desc: "Avanzas 2 casillas.", advance: 2 },
  { id: "e5", title: "Serpiente", desc: "Retrocedes 1 casilla.", advance: -1 },
];

export function drawRandomEvent() {
  return EVENT_DECK[Math.floor(Math.random() * EVENT_DECK.length)];
}

export function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

export function createPlayers(names = ["Arara", "Jaguar"]) {
  return names.map((name, i) => ({
    id: i + 1,
    name,
    color: PLAYER_COLORS[i % PLAYER_COLORS.length],
    position: 0,
    oro: 0,
    agua: 2,
    energia: 3,
  }));
}

export function applyTileEffects(player, tile) {
  // Returns { player: updatedPlayer, message: string, extraMove: number }
  let message = "";
  let extraMove = 0;
  let p = { ...player };

  switch (tile.type) {
    case "rio":
      message = "Navegas el río, sin cambios.";
      break;
    case "mercado":
      if (p.oro > 0) {
        p.agua += 1;
        p.energia = Math.min(5, p.energia + 1);
        p.oro -= 1;
        message = "Intercambias 1 oro por 1 agua y +1 energía.";
      } else {
        message = "No tienes oro para comerciar.";
      }
      break;
    case "campamento":
      p.energia = Math.min(5, p.energia + 2);
      message = "+2 energía al acampar.";
      break;
    case "peligro":
      p.energia = Math.max(0, p.energia - 1);
      message = "Peligro en la selva: -1 energía.";
      break;
    case "tesoro":
      p.oro += 1;
      message = "¡Encontraste oro! +1 oro.";
      break;
    case "evento":
      const ev = drawRandomEvent();
      if (typeof ev.advance === "number") {
        extraMove = ev.advance;
        message = `${ev.title}: ${ev.desc}`;
      } else if (ev.effect) {
        p = ev.effect(p);
        message = `${ev.title}: ${ev.desc}`;
      }
      break;
    case "start":
    default:
      message = "Inicio de la expedición.";
  }

  return { player: p, message, extraMove };
}

export function clampPosition(pos) {
  return Math.max(0, Math.min(TILES.length - 1, pos));
}

export function nextPlayerIndex(curr, total) {
  return (curr + 1) % total;
}

export const STORAGE_KEY = "amazonas_mvp_state_v1";

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {}
}

export function createInitialState(playerNames) {
  const players = createPlayers(playerNames);
  return {
    players,
    activeIdx: 0,
    lastRoll: null,
    message: "",
    arEnabled: false,
    createdAt: Date.now(),
  };
}