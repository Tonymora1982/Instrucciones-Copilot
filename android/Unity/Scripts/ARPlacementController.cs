using System.Collections.Generic;
using UnityEngine;
using UnityEngine.XR.ARFoundation;
using UnityEngine.XR.ARSubsystems;

namespace AmazonasAR
{
    public class ARPlacementController : MonoBehaviour
    {
        [Header("AR Managers")]
        public ARRaycastManager raycastManager;
        public ARPlaneManager planeManager;
        public Camera arCamera;

        [Header("Prefabs")]
        public GameObject boardPrefab;
        public GameObject pawnPrefab;

        [Header("Game Binding")]
        public TurnManager turnManager;

        private GameObject _boardInstance;
        private bool _placed = false;
        private static List<ARRaycastHit> _hits = new List<ARRaycastHit>();

        public bool IsPlaced => _placed;

        void Awake()
        {
            if (!raycastManager) raycastManager = GetComponent<ARRaycastManager>();
            if (!planeManager) planeManager = GetComponent<ARPlaneManager>();
        }

        void Update()
        {
            if (_placed) return;
            if (Input.touchCount == 0) return;

            Touch touch = Input.GetTouch(0);
            if (touch.phase != TouchPhase.Began) return;

            if (raycastManager.Raycast(touch.position, _hits, TrackableType.PlaneWithinPolygon))
            {
                Pose pose = _hits[0].pose;
                PlaceBoard(pose);
            }
        }

        public void PlaceBoardAt(Pose pose)
        {
            PlaceBoard(pose);
        }

        private void PlaceBoard(Pose pose)
        {
            if (_placed || boardPrefab == null) return;
            _boardInstance = Instantiate(boardPrefab, pose.position, pose.rotation);
            _boardInstance.transform.up = pose.up; // Alinear con el plano
            _placed = true;

            // Opcional: deshabilitar visualización de planos para limpiar escena
            SetPlanesActive(false);

            // Inicializar juego con referencia de nodos del tablero
            if (turnManager != null)
            {
                turnManager.BindBoard(_boardInstance);
                turnManager.SpawnPlayers(pawnPrefab);
            }
        }

        private void SetPlanesActive(bool active)
        {
            if (planeManager == null) return;
            foreach (var plane in planeManager.trackables)
            {
                plane.gameObject.SetActive(active);
            }
            planeManager.enabled = active;
        }
    }
}