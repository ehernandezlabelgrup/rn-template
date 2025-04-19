# React Native Package ID Changer

Una herramienta para cambiar el ID de paquete (package ID) en proyectos React Native.

## Características

- Cambia el `applicationId` y `namespace` en `build.gradle`
- Actualiza referencias en archivos Java/Kotlin
- Renombra las carpetas de la estructura del paquete
- Asegura que el nombre del paquete cumpla con las convenciones (solo minúsculas, sin caracteres especiales)

## Estructura del proyecto

```
scripts/
├── utils.js             # Funciones de utilidad
├── gradle-updater.js    # Módulo para actualizar build.gradle
├── java-kotlin-updater.js  # Módulo para actualizar archivos Java/Kotlin
├── project-updater.js   # Módulo principal de actualización
├── cli.js               # Interfaz de línea de comandos
├── package.json         # Configuración npm
└── README.md            # Este archivo
```

## Instalación

1. Clona o copia estos archivos en una carpeta `scripts` en la raíz de tu proyecto React Native.

2. Instala las dependencias:
   ```bash
   cd scripts
   npm install
   ```

3. Haz ejecutable el archivo CLI (en sistemas Unix):
   ```bash
   chmod +x cli.js
   ```

## Uso

### Método 1: Ejecutar directamente

```bash
cd scripts
node cli.js
```

### Método 2: Usar npm scripts

```bash
cd scripts
npm start
```

O para ejecutar y limpiar el proyecto en un solo comando:

```bash
cd scripts
npm run combo
```

## Funcionamiento

1. El script te pedirá ingresar el nombre del nuevo proyecto.
2. Generará el ID de paquete en formato `com.nombreproyecto`.
3. Te mostrará el nuevo ID y pedirá confirmación.
4. Si confirmas, actualizará los archivos y carpetas necesarios.
5. Al finalizar, mostrará un resumen de los cambios realizados.

## Consideraciones

- Este script asume que el ID de paquete actual es `com.habita`.
- Solo cambia las referencias dentro de los archivos Java/Kotlin y el build.gradle.
- Se recomienda hacer una copia de seguridad o usar control de versiones antes de ejecutar este script.
- Después de ejecutar el script, es recomendable limpiar y reconstruir el proyecto:
  ```bash
  # Limpiar proyecto Android
  cd android
  ./gradlew clean
  cd ..
  
  # Ejecutar la app
  npx react-native run-android
  ```

## Extensión

Para extender esta herramienta y agregar soporte para iOS u otras configuraciones, puedes crear nuevos módulos siguiendo el patrón existente.