using System.Collections.Generic;
using UnityEngine;

namespace AmazonasAR
{
    public class BoardPath : MonoBehaviour
    {
        public List<Transform> nodes = new List<Transform>();
        [Header("Auto-generate (editor/test)")]
        public bool autoGenerateIfEmpty = true;
        public int gridSize = 6;
        public float spacing = 0.06f;

        void Awake()
        {
            if (nodes == null || nodes.Count == 0)
            {
                // Try to collect Node_* children
                foreach (var t in GetComponentsInChildren<Transform>())
                {
                    if (t == transform) continue;
                    if (t.name.StartsWith("Node_")) nodes.Add(t);
                }
            }

            if (autoGenerateIfEmpty && (nodes == null || nodes.Count == 0))
            {
                GenerateGridPath();
            }
        }

        public void GenerateGridPath()
        {
            nodes = new List<Transform>();
            int id = 0;
            for (int r = 0; r < gridSize; r++)
            {
                for (int c0 = 0; c0 < gridSize; c0++)
                {
                    int c = (r % 2 == 0) ? c0 : (gridSize - 1 - c0);
                    var go = new GameObject($"Node_{id}");
                    go.transform.SetParent(transform);
                    go.transform.localPosition = new Vector3(c * spacing, 0f, r * spacing);
                    nodes.Add(go.transform);
                    id++;
                }
            }
        }
    }
}