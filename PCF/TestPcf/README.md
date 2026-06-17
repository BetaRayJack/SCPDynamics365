# TestPcf

PCF de prueba para validar despliegue en un entorno de pruebas.

## Qué hace

Control de texto enlazado a un campo de una tabla de Dataverse. Permite escribir un valor, leerlo desde el formulario y devolverlo como salida del control.

## Estructura

- `ControlManifest.Input.xml`: manifiesto del control.
- `index.ts`: implementación del control.
- `package.json` y `tsconfig.json`: configuración del proyecto.

## Uso esperado

1. Ejecutar `npm install` dentro de esta carpeta.
2. Compilar con `npm run build`.
3. Empaquetar el resultado en la solución de Power Platform que uses para pruebas.