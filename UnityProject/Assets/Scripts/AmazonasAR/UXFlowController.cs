using UnityEngine;
using UnityEngine.UI;

namespace AmazonasAR
{
    public class UXFlowController : MonoBehaviour
    {
        [Header("Panels")]
        public GameObject panelScan;
        public GameObject panelPlaced;
        public GameObject panelTurnHUD;

        [Header("Refs")]
        public ARPlacementController placement;
        public TurnManager turnManager;

        void Update()
        {
            if (!placement) return;
            bool placed = placement.IsPlaced;
            if (panelScan) panelScan.SetActive(!placed);
            if (panelPlaced) panelPlaced.SetActive(placed);
            if (panelTurnHUD) panelTurnHUD.SetActive(placed);
        }

        public void OnEndTurn()
        {
            SFXController.Instance?.PlayUiTap();
            turnManager?.EndTurn();
        }

        public void OnReset()
        {
            SFXController.Instance?.PlayUiTap();
            // Puedes implementar una limpieza/respawn si lo deseas
        }
    }
}