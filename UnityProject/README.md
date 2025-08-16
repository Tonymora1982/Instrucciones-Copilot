# UnityProject (ARCore + AR Foundation)

**Estado Actual:** La estructura de este proyecto de Unity ha sido inicializada. Los scripts de C# han sido copiados a `Assets/Scripts/AmazonasAR` y se han creado archivos de marcador de posición para la escena y los Prefabs.

**Próximos Pasos (requiere Editor de Unity):**
1.  **Abrir en Unity:** Abre este directorio (`UnityProject`) como un proyecto en Unity Hub (usando Unity 2022.3 LTS).
2.  **Completar Escena `ARGame.unity`:**
    - Abre la escena desde `Assets/Scenes/ARGame.unity`.
    - Añade los objetos `AR Session` y `AR Session Origin` con los componentes `AR Plane Manager` y `AR Raycast Manager`.
    - Crea un objeto `GameController` y asígnale los scripts de lógica (`TurnManager`, `UXFlowController`, etc.).
    - Asigna `ARPlacementController` al `AR Session Origin`.
3.  **Crear Prefabs:**
    - Edita `Board.prefab` y `Pawn.prefab` en `Assets/Prefabs/` para crear los modelos 3D y su lógica.
    - Asigna los prefabs resultantes a los campos correspondientes en los scripts (ej. en `ARPlacementController`).
4.  **Construir UI:** Diseña el Canvas de la UI con botones y textos, y vincúlalos a los scripts.

A continuación, se deja la guía de componentes original como referencia.

---

**Guía de Componentes Mínimos:**
- **Scripts:** Los scripts de `/android/Unity/Scripts` ya han sido copiados a `Assets/Scripts/AmazonasAR`.
- **Escena (Assets/Scenes/ARGame.unity):** Debe contener:
  - AR Session, AR Session Origin (AR Plane Manager, AR Raycast Manager)
  - ARPlacementController + ARReticle
  - TurnManager, UXFlowController, SFXController
  - BoardPrefab (con BoardPath) y PawnPrefab low‑poly
  - Dado físico (DicePhysics) opcional

CI listo:
- Los workflows ya apuntan a UnityProject. Al hacer push a main o staging/ar-3d-mvp, se construye el APK tras activar UNITY_LICENSE.