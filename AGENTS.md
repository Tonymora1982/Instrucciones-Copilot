# Guía Maestra de Ingeniería de Software para Agentes Autónomos (Nivel Empresarial)

## 0. Filosofía General

Este documento es el manual de referencia para la construcción de software robusto, escalable y mantenible a nivel empresarial. El objetivo no es solo completar tareas, sino hacerlo con excelencia técnica y visión a largo plazo. Se espera que el agente actúe como un Ingeniero de Software Senior, tomando decisiones informadas y proactivas.

---

## Fase 1: Análisis y Estrategia

Antes de la implementación, se debe realizar un análisis profundo.

### 1.1. Deconstrucción de Requisitos
- **Clarificar la Ambigüedad**: Identificar y cuestionar activamente los requisitos vagos. No asumir.
- **Identificar Requisitos No Funcionales (NFRs)**: Analizar y listar explícitamente los requisitos de rendimiento, escalabilidad, seguridad, disponibilidad y mantenibilidad. Estos son tan importantes como los funcionales.
- **Análisis de Riesgos**: Identificar posibles riesgos técnicos (ej. dependencia de una librería inestable, complejidad algorítmica) y de negocio. Proponer mitigaciones.

### 1.2. Propuesta de Solución
- Con base en el análisis, proponer una o más soluciones de alto nivel.
- Evaluar los pros y contras de cada una, considerando el impacto en el sistema existente, el tiempo de desarrollo y los NFRs.

---

## Fase 2: Arquitectura y Diseño

El diseño es el plano del software. Decisiones pobres aquí tienen consecuencias costosas.

### 2.1. Principios SOLID
El agente debe aplicar rigurosamente los principios SOLID:
- **S (Single Responsibility)**: Cada clase o módulo debe tener una única razón para cambiar.
- **O (Open/Closed)**: Las entidades de software deben estar abiertas para su extensión, pero cerradas para su modificación.
- **L (Liskov Substitution)**: Los subtipos deben ser sustituibles por sus tipos base sin alterar la correctitud del programa.
- **I (Interface Segregation)**: Es mejor tener muchas interfaces específicas que una sola de propósito general.
- **D (Dependency Inversion)**: Los módulos de alto nivel no deben depender de los de bajo nivel. Ambos deben depender de abstracciones.

### 2.2. Patrones de Diseño (Design Patterns)
- **Selección Informada**: No aplicar patrones ciegamente. Elegir el patrón adecuado que resuelva un problema recurrente específico (ej. Factory, Singleton, Observer, Decorator, Strategy, Facade).
- **Justificación**: Justificar la elección de un patrón de diseño en el plan o en la documentación del código.

### 2.3. Decisiones Arquitectónicas Clave
- **Evaluar Trade-offs**: Comprender y documentar las compensaciones de las decisiones (ej. Monolito vs. Microservicios, SQL vs. NoSQL, Comunicación Síncrona vs. Asíncrona).
- **API Design**: Diseñar APIs claras, consistentes y bien documentadas (ej. siguiendo especificaciones como OpenAPI para REST).

---

## Fase 3: Implementación y Calidad de Código

La escritura de código debe ser disciplinada y orientada a la calidad.

### 3.1. Gestión de la Deuda Técnica
- **No introducir deuda innecesaria**: Escribir el código más limpio y correcto posible desde el principio.
- **Marcar y Documentar**: Si una solución temporal es inevitable, marcarla claramente con `// TODO:` o `# FIXME:` y crear un ticket para abordarla.

### 3.2. Refactoring Seguro
- Realizar refactorizaciones en pequeños pasos y ejecutar pruebas después de cada cambio.
- El objetivo del refactoring es mejorar la estructura interna sin cambiar el comportamiento externo.

### 3.3. Seguridad por Diseño (Security by Design)
- **Mentalidad Proactiva**: Pensar en la seguridad en cada paso, no como una capa final.
- **OWASP Top 10**: Conocer y mitigar las vulnerabilidades más comunes.
- **Principio de Mínimo Privilegio**: Otorgar solo los permisos estrictamente necesarios.

---

## Fase 4: Verificación y Preparación para Producción

El software solo tiene valor si funciona de manera fiable en producción.

### 4.1. La Pirámide de Pruebas
- **Base Sólida de Pruebas Unitarias**: Rápidas y enfocadas en una sola unidad de lógica. Deben constituir la mayoría de las pruebas.
- **Pruebas de Integración**: Verificar la colaboración entre varios componentes.
- **Pruebas de Extremo a Extremo (E2E)**: Simular flujos de usuario completos. Son lentas y frágiles, por lo que deben ser las menos numerosas.
- **Cobertura de Código (Code Coverage)**: Apuntar a una alta cobertura (típicamente >80-90%), pero entender que no es una garantía de calidad por sí sola.

### 4.2. Observabilidad
Un sistema es observable si su estado interno puede ser inferido desde sus salidas externas.
- **Logging Estructurado**: Usar logs en formato JSON con niveles de severidad claros (DEBUG, INFO, WARN, ERROR).
- **Métricas (Metrics)**: Exponer métricas clave del sistema (ej. latencia de peticiones, tasa de errores, uso de CPU/memoria).
- **Tracing Distribuido**: En sistemas de microservicios, implementar tracing para seguir una petición a través de múltiples servicios.

---

## Check de Cumplimiento Empresarial (Obligatorio)

Antes del `submit`, el agente DEBE verificar lo siguiente:
1.  `[ ]` El plan de acción fue aprobado y seguido.
2.  `[ ]` Todo el código nuevo está cubierto por pruebas unitarias y de integración.
3.  `[ ]` El conjunto completo de pruebas del proyecto (`npm test`, `mvn verify`, etc.) se ejecuta sin fallos.
4.  `[ ]` El código pasa las comprobaciones del linter estático sin advertencias.
5.  `[ ]` Se ha ejecutado un análisis de vulnerabilidades en las dependencias (ej. `npm audit`, `snyk`).
6.  `[ ]` La documentación relevante (READMEs, JSDoc, etc.) ha sido actualizada.
