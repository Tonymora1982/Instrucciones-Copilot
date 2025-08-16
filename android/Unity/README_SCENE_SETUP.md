# Setup rápido de la escena ARGame en Unity

1) Importa los scripts de /app/android/Unity/Scripts al proyecto (manten la misma estructura si quieres).
2) Crea la escena ARGame:
   - GameObject → XR → AR Session
   - GameObject → XR → AR Session Origin (agrega AR Plane Manager y AR Raycast Manager)
   - En AR Session Origin añade el componente `ARPlacementController` y referencia:
     - RaycastManager = AR Raycast Manager del mismo objeto
     - PlaneManager = AR Plane Manager del mismo objeto
     - AR Camera = la cámara del AR Session Origin
     - BoardPrefab = un prefab con un `BoardPath` (ver abajo)
     - PawnPrefab = un peón sencillo (primitive, cone/capsule) con material
     - TurnManager = un GameObject vacío de la escena con el componente `TurnManager`
   - Opcional: añade `PlayModeFallback` a un GameObject para probar en Editor.
3) BoardPrefab:
   - Crea un Empty llamado BoardPrefab, agrega `BoardPath`.
   - Si no tienes nodos, activa `autoGenerateIfEmpty` y define gridSize=6, spacing=0.06.
   - Para visual, añade un plane o un mesh estilizado del tablero.
4) TurnManager:
   - Asigna referencias de UI (playerNameText, rollText, messageText) desde el Canvas.
   - Si quieres animación de movimiento, añade un `PawnMover` a la escena y asígnalo en el TurnManager (campo opcional si lo has expuesto).
5) UI Canvas:
   - Botones: "Lanzar dado" llama a `DiceRoller.Roll()`. Vincula `turnManager` en el DiceRoller.
   - Botón "Fin de turno" → TurnManager.EndTurn().
   - Botón "Reiniciar" → TurnManager.ResetGame().
6) Build:
   - Activa ARCore en Project Settings → XR Plug-in Management → Android.
   - Player Settings: IL2CPP, ARM64, Min SDK 30, OpenGLES3.
   - File → Build & Run en un dispositivo compatible con ARCore.