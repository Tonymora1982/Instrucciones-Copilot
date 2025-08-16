# UnityProject (ARCore + AR Foundation)

Coloca aquí el proyecto Unity 2022.3 LTS con la escena ARGame:
- Estructura requerida:
  - UnityProject/Assets/** (incluye tu escena ARGame.unity, Prefabs y Scripts)
  - UnityProject/ProjectSettings/**
  - UnityProject/Packages/**

Qué debes incluir mínimo:
- Scripts: copia desde /android/Unity/Scripts a Assets/Scripts/AmazonasAR
- Escena: Assets/Scenes/ARGame.unity con:
  - AR Session, AR Session Origin (AR Plane Manager, AR Raycast Manager)
  - ARPlacementController + ARReticle
  - TurnManager, UXFlowController, SFXController
  - BoardPrefab (con BoardPath) y PawnPrefab low‑poly
  - Dado físico (DicePhysics) opcional

CI listo:
- Los workflows ya apuntan a UnityProject. Al hacer push a main o staging/ar-3d-mvp, se construye el APK tras activar UNITY_LICENSE.