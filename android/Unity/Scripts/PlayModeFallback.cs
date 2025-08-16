using UnityEngine;
using UnityEngine.XR.ARFoundation;

namespace AmazonasAR
{
    public class PlayModeFallback : MonoBehaviour
    {
        public GameObject boardPrefab;
        public TurnManager turnManager;

        void Start()
        {
            // Si no hay ARSession o estamos en editor, instanciar tablero en (0,0,1)
            bool noAR = Application.isEditor || (ARSession.state == ARSessionState.None || ARSession.state == ARSessionState.Unsupported);
            if (noAR && boardPrefab != null)
            {
                var board = Instantiate(boardPrefab, new Vector3(0, 0, 1f), Quaternion.identity);
                if (turnManager)
                {
                    turnManager.BindBoard(board);
                    // En editor puedes llamar a SpawnPlayers manualmente desde el inspector tras asignar PawnPrefab mediante ARPlacement o directamente en escena
                }
            }
        }
    }
}