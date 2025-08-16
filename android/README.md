# Reto del Amazonas – App Android Nativa (ARCore + Unity AR Foundation)

Este directorio contiene el plan y los scripts base para construir el MVP nativo Android con ARCore usando Unity + AR Foundation. No requiere API keys y funciona en la mayoría de dispositivos Android compatibles con ARCore.

## Decisiones
- Motor: Unity 2022/2023 LTS (recomendado 2022.3 LTS) + AR Foundation 5.x + ARCore XR Plugin 5.x
- Android mínimo: Android 11 (API 30). Funciona en 10+, pero apuntamos a 11+ para estabilidad y permisos.
- Modo de juego: Pass & Play local. 2-4 jugadores. Reglas alineadas con el MVP web.
- AR: Colocación de “tablero/campamento” sobre plano horizontal. Peones 3D movibles por turnos. Dado virtual.
- Persistencia: Offline por ahora. (Más tarde podremos integrar backend FastAPI/Mongo para guardado en nube.)

## Estructura sugerida en Unity
- Scenes/
  - ARGame.unity
- Prefabs/
  - BoardPrefab (contiene puntos del recorrido: hijos llamados `Node_0` ... `Node_N`)
  - PawnPrefab (peón/canoa low poly)
- Scripts/ (usar los .cs de /Unity/Scripts de este repo)
  - ARPlacementController.cs
  - TurnManager.cs
  - DiceRoller.cs
  - GameState.cs
- UI/
  - Canvas con botones (Roll, End Turn, Reset), panel HUD de recursos, mensajes

## Pasos de Configuración
1) Instalar Unity Hub y Unity 2022.3 LTS con módulos Android (SDK/NDK, OpenJDK).
2) Crear proyecto 3D (URP opcional). Abrir el Package Manager:
   - Instalar “AR Foundation” (5.x)
   - Instalar “ARCore XR Plugin” (5.x)
3) En la escena ARGame:
   - Añadir objetos: `AR Session` y `AR Session Origin`.
   - En `AR Session Origin` agregar componentes: `AR Plane Manager`, `AR Raycast Manager` y una cámara (AR Camera).
   - Importar y asignar los scripts:
     - `ARPlacementController` al `AR Session Origin`.
       - Campos: BoardPrefab, PawnPrefab, ARRaycastManager, ARPlaneManager, AR Camera
     - `TurnManager` a un GameObject vacío `GameController`.
     - `DiceRoller` al Canvas/Botón de dado.
4) Preparar `BoardPrefab`:
   - Estructura: objeto raíz con visual del tablero y una lista de `Transform` hijos nombrados `Node_0`, `Node_1`, ..., en orden del camino (serpiente 6x6 o el que elijas).
   - Agregar un collider plano bajo el tablero para facilitar toques si deseas interacción directa.
5) Preparar `PawnPrefab`:
   - Mesh simple (peón/canoa), collider, `Rigidbody` (opcional) y un material por color. El color final se setea desde `TurnManager`.
6) UI Canvas:
   - Botones: “Lanzar dado”, “Fin de turno”, “Reiniciar”. Textos: nombre del jugador activo, último lanzamiento, mensaje, recursos.
   - Vincular eventos del botón al `DiceRoller.Roll()` y `TurnManager.EndTurn()`/`ResetGame()`.

## Build Android
- File → Build Settings → Android → Switch Platform.
- Player Settings → Other Settings:
  - Scripting Backend: IL2CPP
  - Target Architectures: ARMv7, ARM64
  - Min SDK: 30 (Android 11)
  - Remove Vulkan si hay problemas; usar OpenGLES3
- XR Plug-in Management → ARCore habilitado.
- Conectar dispositivo con depuración USB → Build & Run (APK o AAB).

## Qué hace cada script
- ARPlacementController: detecta plano, coloca el tablero en el primer tap y genera peones. Desactiva visualización de planos luego de colocar.
- TurnManager: lógica de turnos, lanzamiento de dado, movimiento de peón por nodos y efectos básicos de casillas (tesoro, mercado, campamento, peligro, evento) con estados de recursos.
- DiceRoller: UI para dado, llama a TurnManager y muestra resultado.
- GameState: modelos de datos y utilidades.

## Notas
- Mantén la lógica alineada al MVP web para coherencia. Los nombres de casillas se deducen por índice/modulos (5/7/9/11/13) igual que en web.
- Puedes importar assets GLB simples (canoa low poly) o usar primitives.
- Si el dispositivo no soporta ARCore, muestra un panel informando y ofrece modo 2D (el MVP web actual).