# CI para generar APK + ZIP con GitHub Actions (GameCI)

Este ejemplo permite generar un APK Android (debug) y un ZIP del build usando Unity 2022.3 LTS.

## Requisitos
- Proyecto Unity 2022.3 LTS (con AR Foundation y ARCore XR Plugin) ya en el repo (rama `main`).
- Secret del repo `UNITY_LICENSE` con el contenido del archivo `.ulf` (Unity Personal/Pro).

## Pasos
1) Ejecuta el workflow `Unity - Request Activation File` para obtener `unity-activation-file.alf` (Artifacts).
2) Sube el `.alf` a https://license.unity3d.com/manual y descarga `Unity_v20xx.x.xfX.ulf`.
3) En GitHub → Settings → Secrets → Actions, crea `UNITY_LICENSE` con el contenido completo del `.ulf`.
4) Ejecuta el workflow `Build Android APK (Unity 2022.3 LTS)`.
5) Descarga `RetoAmazonas-ARCore-debug.apk` y `RetoAmazonas-ARCore-build.zip` desde los Artifacts.

## Notas
- Para Debug APK no necesitas keystore propio; Unity usa un debug keystore. Para Release, añade tu keystore y variables a unity-builder.
- Si el proyecto no está en `main`, ajusta `paths/branches` en el YAML.
- Si deseas AAB, establece `androidAppBundle: true`.