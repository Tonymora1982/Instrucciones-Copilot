# CI de Unity para generar APK

- request-unity-activation.yml: genera .alf para activar Unity (Unity Personal) → crea secreto UNITY_LICENSE.
- build-android-apk.yml: compila APK Android y sube APK + ZIP como Artifacts.

Para que construya, el proyecto Unity (Assets, ProjectSettings, Packages) debe existir en la rama. Este repo incluye scripts y guías en /android; tras subir el proyecto Unity, disparar build.