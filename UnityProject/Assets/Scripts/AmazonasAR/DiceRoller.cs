using UnityEngine;

namespace AmazonasAR
{
    public class DiceRoller : MonoBehaviour
    {
        public TurnManager turnManager;

        public void Roll()
        {
            if (turnManager != null)
            {
                turnManager.RollAndMove();
            }
        }
    }
}