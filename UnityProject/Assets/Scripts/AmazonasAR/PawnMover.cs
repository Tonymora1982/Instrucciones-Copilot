using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace AmazonasAR
{
    public class PawnMover : MonoBehaviour
    {
        [Range(0.05f, 1f)] public float stepDuration = 0.25f;
        public AnimationCurve moveCurve = AnimationCurve.EaseInOut(0, 0, 1, 1);
        public float hopHeight = 0.02f;

        public IEnumerator MoveSequential(GameObject pawn, List<Transform> nodes, int fromIndex, int toIndex)
        {
            if (!pawn || nodes == null || nodes.Count == 0) yield break;
            if (fromIndex == toIndex) yield break;

            int dir = toIndex > fromIndex ? 1 : -1;
            for (int i = fromIndex; i != toIndex; i += dir)
            {
                int next = i + dir;
                SFXController.Instance?.PlayStep();
                yield return MoveBetween(pawn, nodes[i].position, nodes[next].position);
            }
        }

        private IEnumerator MoveBetween(GameObject pawn, Vector3 a, Vector3 b)
        {
            float t = 0f;
            Vector3 up = Vector3.up * hopHeight;
            while (t < 1f)
            {
                t += Time.deltaTime / Mathf.Max(0.01f, stepDuration);
                float e = moveCurve.Evaluate(Mathf.Clamp01(t));
                // pequeño salto tipo arco
                Vector3 mid = Vector3.Lerp(a, b, e) + up * Mathf.Sin(e * Mathf.PI);
                pawn.transform.position = mid;
                yield return null;
            }
            pawn.transform.position = b;
        }
    }
}