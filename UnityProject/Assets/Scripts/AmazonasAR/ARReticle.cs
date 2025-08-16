using System.Collections.Generic;
using UnityEngine;
using UnityEngine.XR.ARFoundation;
using UnityEngine.XR.ARSubsystems;

namespace AmazonasAR
{
    // Muestra una retícula donde hay un pose válido y permite colocar el tablero con tap
    public class ARReticle : MonoBehaviour
    {
        public ARRaycastManager raycastManager;
        public Camera arCamera;
        public GameObject reticleVisual; // círculo/quad con material semitransparente
        public ARPlacementController placementController; // referencia para colocar el tablero

        private static readonly List<ARRaycastHit> Hits = new List<ARRaycastHit>();
        private Pose _lastPose;
        private bool _hasPose = false;

        void Awake()
        {
            if (!raycastManager) raycastManager = GetComponent<ARRaycastManager>();
            if (!arCamera) arCamera = Camera.main;
        }

        void Update()
        {
            UpdatePose();
            UpdateReticle();
            HandleTapToPlace();
        }

        void UpdatePose()
        {
            Vector2 screenPoint = new Vector2(Screen.width / 2f, Screen.height / 2f);
            _hasPose = raycastManager && raycastManager.Raycast(screenPoint, Hits, TrackableType.PlaneWithinPolygon);
            if (_hasPose)
            {
                _lastPose = Hits[0].pose;
            }
        }

        void UpdateReticle()
        {
            if (!reticleVisual) return;
            reticleVisual.SetActive(_hasPose && (placementController == null || !placementControllerPlaced));
            if (_hasPose)
            {
                reticleVisual.transform.SetPositionAndRotation(_lastPose.position, _lastPose.rotation);
            }
        }

        bool placementControllerPlaced => placementController != null && placementController.IsPlaced;

        void HandleTapToPlace()
        {
            if (placementControllerPlaced) return;
            if (!_hasPose) return;
            if (Input.touchCount == 0) return;
            var touch = Input.GetTouch(0);
            if (touch.phase != TouchPhase.Began) return;
            placementController?.PlaceBoardAt(_lastPose);
        }
    }
}