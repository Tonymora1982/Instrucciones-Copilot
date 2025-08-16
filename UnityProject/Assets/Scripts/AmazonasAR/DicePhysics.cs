using System;
using System.Collections;
using UnityEngine;

namespace AmazonasAR
{
    public class DicePhysics : MonoBehaviour
    {
        public Rigidbody rb;
        public float throwForce = 2.5f;
        public float torque = 10f;
        public Transform throwOrigin;
        public TurnManager turnManager;
        public AudioSource audioSource;
        public AudioClip rollClip;

        private bool _rolling = false;

        void Awake()
        {
            if (!rb) rb = GetComponent<Rigidbody>();
        }

        public void RollDice()
        {
            if (_rolling) return;
            StartCoroutine(RollRoutine());
        }

        IEnumerator RollRoutine()
        {
            _rolling = true;
            if (audioSource && rollClip) audioSource.PlayOneShot(rollClip, 0.6f);
            Handheld.Vibrate();

            // Reset pose
            rb.velocity = Vector3.zero;
            rb.angularVelocity = Vector3.zero;
            transform.position = throwOrigin ? throwOrigin.position : transform.position + Vector3.up * 0.1f;
            transform.rotation = UnityEngine.Random.rotation;

            // Apply impulse
            Vector3 dir = (throwOrigin ? throwOrigin.forward : Vector3.forward) + Vector3.up * 0.5f;
            rb.AddForce(dir.normalized * throwForce, ForceMode.VelocityChange);
            rb.AddTorque(UnityEngine.Random.onUnitSphere * torque, ForceMode.VelocityChange);

            yield return new WaitForSeconds(1.2f);
            // Wait until sleep
            float timeout = 3f;
            while (!rb.IsSleeping() && timeout > 0f)
            {
                timeout -= Time.deltaTime;
                yield return null;
            }

            int value = DetermineTopFace();
            turnManager?.RollAndMoveWithValue(value);
            _rolling = false;
        }

        int DetermineTopFace()
        {
            // Asume un cubo 1x1x1 con caras: up=1, down=6, forward=2, back=5, right=3, left=4 (puedes reasignar)
            Vector3 up = transform.up;
            Vector3 fwd = transform.forward;
            Vector3 right = transform.right;

            int best = 1;
            float bestDot = Vector3.Dot(up, Vector3.up);
            best = 1;

            float d;
            d = Vector3.Dot(-up, Vector3.up); if (d > bestDot) { bestDot = d; best = 6; }
            d = Vector3.Dot(fwd, Vector3.up); if (d > bestDot) { bestDot = d; best = 2; }
            d = Vector3.Dot(-fwd, Vector3.up); if (d > bestDot) { bestDot = d; best = 5; }
            d = Vector3.Dot(right, Vector3.up); if (d > bestDot) { bestDot = d; best = 3; }
            d = Vector3.Dot(-right, Vector3.up); if (d > bestDot) { bestDot = d; best = 4; }
            return best;
        }
    }
}