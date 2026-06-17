# SCPDynamics365
Dynamics 365 Repository to Ideas of Plugins &amp; Js

## Empaquetado PCF

El PCF de prueba empaquetable está en [PCF/TestPcfPack](PCF/TestPcfPack).

Para generar el paquete:

1. Ejecuta `npm install` dentro de [PCF/TestPcfPack](PCF/TestPcfPack).
2. Ejecuta `npm run build` dentro de [PCF/TestPcfPack](PCF/TestPcfPack).
3. Empaqueta la solución con `pac solution pack --zipfile .\artifacts\TestPcfSolution.zip --folder .\Solution\TestPcfSolution\src` desde [Solution/TestPcfSolution](Solution/TestPcfSolution).

Para subirlo a un entorno de pruebas:

1. Inicia sesión en Power Platform con `pac auth create --url https://<tu-entorno>.crm.dynamics.com`.
2. Importa el zip con `pac solution import --path .\artifacts\TestPcfSolution.zip` desde [Solution/TestPcfSolution](Solution/TestPcfSolution) o desde la raíz del repositorio.
3. Si el entorno no refresca el componente, publica las personalizaciones con `pac solution publish`.

## Proyectos

- `ScpPlugins`: ensamblado .NET para plugins.
- `WebResources`: recursos JavaScript.
- `PCF/TestPcfPack`: PCF de prueba listo para empaquetado.
