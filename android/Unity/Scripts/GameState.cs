using System;
using System.Collections.Generic;
using UnityEngine;

namespace AmazonasAR
{
    [Serializable]
    public class PlayerState
    {
        public string name;
        public Color color;
        public int position;
        public int oro;
        public int agua;
        public int energia;

        public PlayerState(string name, Color color)
        {
            this.name = name;
            this.color = color;
            position = 0;
            oro = 0;
            agua = 2;
            energia = 3;
        }
    }

    public static class Rules
    {
        public static int Clamp(int v, int min, int max) => Mathf.Max(min, Mathf.Min(max, v));

        public static string TileLabel(int idx)
        {
            if (idx == 0) return "Inicio";
            if (idx % 13 == 0) return "Tesoro";
            if (idx % 11 == 0) return "Campamento";
            if (idx % 9 == 0) return "Mercado";
            if (idx % 7 == 0) return "Peligro";
            if (idx % 5 == 0) return "Evento";
            return "Río";
        }

        public static string ApplyTile(PlayerState p, int tileIndex, out int extraMove)
        {
            extraMove = 0;
            string type = TileLabel(tileIndex);
            switch (type)
            {
                case "Río":
                    return "Navegas el río, sin cambios.";
                case "Mercado":
                    if (p.oro > 0)
                    {
                        p.agua += 1;
                        p.energia = Clamp(p.energia + 1, 0, 5);
                        p.oro -= 1;
                        return "Intercambias 1 oro por 1 agua y +1 energía.";
                    }
                    return "No tienes oro para comerciar.";
                case "Campamento":
                    p.energia = Clamp(p.energia + 2, 0, 5);
                    return "+2 energía al acampar.";
                case "Peligro":
                    p.energia = Clamp(p.energia - 1, 0, 5);
                    return "Peligro en la selva: -1 energía.";
                case "Tesoro":
                    p.oro += 1;
                    return "¡Encontraste oro! +1 oro.";
                case "Evento":
                    // Eventos simples
                    int r = UnityEngine.Random.Range(0, 5);
                    if (r == 0) { p.energia = Clamp(p.energia - 1, 0, 5); return "Lluvia: -1 energía."; }
                    if (r == 1) { p.agua += 1; return "Guía local: +1 agua."; }
                    if (r == 2) { extraMove = 2; return "Corriente favorable: avanza 2."; }
                    if (r == 3) { extraMove = -1; return "Serpiente: retrocede 1."; }
                    return "Fauna curiosa: nada ocurre.";
                default:
                    return "Inicio de la expedición.";
            }
        }
    }
}