# Guía de Buenas Prácticas para Agentes de Programación Autónomos

Este documento establece las directrices y mejores prácticas que todos los agentes de programación autónomos deben seguir para asegurar la calidad, mantenibilidad y robustez del software desarrollado en este repositorio.

## 1. Principios Fundamentales

### 1.1. Comprensión y Planificación Exhaustiva
Antes de escribir una sola línea de código, el agente debe:
- **Analizar a fondo los requisitos del usuario**: Comprender el "qué" y el "porqué" de la solicitud. Si hay ambigüedad, solicitar una clarificación.
- **Explorar la estructura del código existente**: Utilizar herramientas como `ls -R`, `grep`, y `find` para entender la arquitectura, los módulos y las convenciones del proyecto.
- **Leer la documentación relevante**: Revisar siempre los archivos `README.md` y otros `AGENTS.md` que puedan existir en el repositorio.
- **Crear un plan de acción detallado**: Usar `set_plan` para definir una secuencia de pasos lógicos y verificables. El plan debe incluir la escritura de código, pruebas y verificación.

### 1.2. Calidad y Consistencia del Código
- **Seguir las Convenciones Existentes**: Adherirse estrictamente al estilo de código (linting), nombramiento de variables/funciones y patrones de diseño ya presentes en el proyecto. La consistencia es clave.
- **Escribir Código Limpio y Legible**: El código debe ser auto-explicativo. Usar comentarios solo cuando sea necesario para clarificar lógica compleja. Aplicar principios como **DRY** (Don't Repeat Yourself) y **KISS** (Keep It Simple, Stupid).
- **No editar Artefactos de Build**: Nunca se deben modificar directamente los archivos generados en directorios como `dist/`, `build/`, `target/` o `node_modules/`. El agente debe localizar y editar el código fuente original y luego ejecutar el proceso de build correspondiente.

### 1.3. Pruebas Rigurosas y Verificación Continua
- **Verificar cada paso**: Después de cada acción que modifique el sistema de archivos (`create_file`, `replace_with_git_merge_diff`, etc.), se debe verificar el resultado con `read_file`, `ls` o `grep` antes de marcar el paso como completado.
- **Ejecutar Pruebas Existentes**: Localizar y ejecutar el conjunto de pruebas relevante (unitarias, integración, e2e) para asegurar que los cambios no introducen regresiones.
- **Escribir Nuevas Pruebas**: Para nuevas funcionalidades, es obligatorio escribir pruebas que validen el comportamiento esperado. Se recomienda un enfoque de **TDD (Test-Driven Development)** siempre que sea posible.
- **Verificación Frontend**: Para cambios que impactan la interfaz de usuario (HTML, CSS, JS), el agente debe usar `frontend_verification_instructions` para generar una prueba visual que demuestre que los cambios funcionan como se espera.

### 1.4. Seguridad como Prioridad
- **Validación de Entradas**: Sanitizar y validar todas las entradas externas o del usuario para prevenir vulnerabilidades comunes (XSS, Inyección SQL, etc.).
- **Gestión de Secretos**: No incluir claves de API, contraseñas u otra información sensible directamente en el código fuente. Utilizar mecanismos seguros para su gestión.

## 2. Flujo de Trabajo del Agente

El agente debe seguir este flujo de trabajo:

1.  **Análisis y Exploración**: Entender la tarea y el código base.
2.  **Planificación**: Crear un plan detallado con `set_plan`.
3.  **Ejecución Iterativa**:
    - Escribir o modificar el código para un paso del plan.
    - Verificar que el cambio se aplicó correctamente.
    - Ejecutar las pruebas relevantes.
    - Repetir hasta completar el paso.
4.  **Verificación Final**: Una vez completados todos los pasos del plan, ejecutar el conjunto completo de pruebas del proyecto.
5.  **Entrega**: Usar `submit` con un mensaje de commit claro y descriptivo.

## 3. Check de Cumplimiento Obligatorio

Antes de invocar a `submit`, el agente **DEBE** realizar las siguientes acciones y confirmar que se completan sin errores. La naturaleza exacta del comando puede variar según el proyecto.

**Ejemplo de Check (a adaptar según el proyecto):**

```bash
# Ejemplo para un proyecto con Node.js
npm install
npm run lint
npm test

# Ejemplo para un proyecto con Python y Pytest
pip install -r requirements.txt
pytest

# Ejemplo para un proyecto con Maven
mvn clean install
```

El agente es responsable de identificar el comando de prueba correcto para el proyecto y ejecutarlo. Si las pruebas fallan, el agente debe depurar y solucionar los problemas antes de la entrega.
