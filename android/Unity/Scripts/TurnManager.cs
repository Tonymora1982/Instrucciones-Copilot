using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

namespace AmazonasAR
{
    public class TurnManager : MonoBehaviour
    {
        [Header("UI Bindings")]
        public Text playerNameText;
        public Text rollText;
        public Text messageText;

        [Header("Players")] public int playerCount = 2;
        public string[] playerNames = { "Arara", "Jaguar", "Tapir", "Puma" };
        public Color[] playerColors =
        {
            new Color(0.02f, 0.37f, 0.27f), // emerald
            new Color(0.57f, 0.25f, 0.05f), // amber
            new Color(0.12f, 0.23f, 0.54f), // blue
            new Color(0.49f, 0.18f, 0.07f)  // orange
        };

        private List<PlayerState> _players = new List<PlayerState>();
        private List<Transform> _nodes = new List<Transform>();
        private Dictionary<PlayerState, GameObject> _pawns = new Dictionary<PlayerState, GameObject>();
        private int _activeIndex = 0;
        private GameObject _board;

        public void BindBoard(GameObject board)
        {
            _board = board;
            _nodes.Clear();

            // Colectar nodos hijos por nombre Node_0..Node_n o por orden
            var all = board.GetComponentsInChildren<Transform>();
            foreach (var t in all)
            {
                if (t == board.transform) continue;
                if (t.name.StartsWith("Node_"))
                {
                    _nodes.Add(t);
                }
            }
            _nodes.Sort((a, b) =>
            {
                int ai = ParseIndex(a.name);
                int bi = ParseIndex(b.name);
                return ai.CompareTo(bi);
            });
        }

        public void SpawnPlayers(GameObject pawnPrefab)
        {
            _players.Clear();
            _pawns.Clear();
            int count = Mathf.Clamp(playerCount, 2, 4);

            for (int i = 0; i < count; i++)
            {
                var p = new PlayerState(playerNames[i], playerColors[i]);
                _players.Add(p);

                if (pawnPrefab && _nodes.Count > 0)
                {
                    var pawn = Instantiate(pawnPrefab, _nodes[0].position, Quaternion.identity);
                    var rend = pawn.GetComponentInChildren<Renderer>();
                    if (rend) rend.material.color = p.color;
                    _pawns[p] = pawn;
                }
            }
            _activeIndex = 0;
            UpdateHUD();
        }

        public void ResetGame()
        {
            foreach (var kv in _pawns)
            {
                if (kv.Value) Destroy(kv.Value);
            }
            _pawns.Clear();
            _players.Clear();
            SpawnPlayers(_pawns.Count > 0 ? null : null); // se regenerarán con SpawnPlayers externo si es necesario
        }

        public void EndTurn()
        {
            _activeIndex = (_activeIndex + 1) % _players.Count;
            UpdateHUD("Pasa el teléfono al siguiente explorador.");
        }

        public void RollAndMove()
        {
            if (_players.Count == 0 || _nodes.Count == 0) return;
            int roll = Random.Range(1, 7);
            var player = _players[_activeIndex];
            int newPos = Mathf.Clamp(player.position + roll, 0, _nodes.Count - 1);

            MovePawnTo(player, newPos);

            // Efectos de casilla
            int extra;
            string msg = Rules.ApplyTile(player, newPos, out extra);
            if (extra != 0)
            {
                int finalPos = Mathf.Clamp(player.position + extra, 0, _nodes.Count - 1);
                MovePawnTo(player, finalPos);
            }

            bool reachedEnd = player.position >= _nodes.Count - 1;
            if (reachedEnd)
            {
                msg = $"{player.name} alcanzó la meta. ¡Victoria!";
            }

            UpdateHUD(msg, roll);
        }

        private void MovePawnTo(PlayerState p, int index)
        {
            p.position = index;
            if (_pawns.TryGetValue(p, out var pawn))
            {
                var target = _nodes[index];
                pawn.transform.position = target.position;
            }
        }

        private void UpdateHUD(string message = "", int lastRoll = 0)
        {
            var player = _players.Count > 0 ? _players[_activeIndex] : null;
            if (playerNameText) playerNameText.text = player != null ? player.name : "-";
            if (rollText) rollText.text = lastRoll > 0 ? $"Dado: {lastRoll}" : "Dado: -";
            if (messageText) messageText.text = message;
        }

        private int ParseIndex(string name)
        {
            // Node_12 -> 12
            var parts = name.Split('_');
            if (parts.Length > 1 && int.TryParse(parts[1], out int idx)) return idx;
            return 0;
        }
    }
}