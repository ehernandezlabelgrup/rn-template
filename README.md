## 📱 Descripción

Template es un template de React Native diseñado para acelerar el inicio de nuevos proyectos. Incluye una estructura de carpetas organizada, componentes predefinidos y una selección de librerías útiles para el desarrollo de aplicaciones móviles.

## 🛠️ Librerías incluidas

- **React**: v19.0.0
- **React Native**: v0.79.1
- **@react-navigation/native** y **@react-navigation/native-stack**: Para la navegación entre pantallas
- **@tanstack/react-query**: Para gestión de estado y peticiones
- **@react-native-async-storage/async-storage**: Para almacenamiento local
- **@react-native-vector-icons**: Conjunto de iconos listos para usar
- **axios**: Cliente HTTP para realizar peticiones a APIs

## 📁 Estructura de carpetas

```
Habita/
├── android/               # Código nativo de Android
├── ios/                   # Código nativo de iOS
├── src/                   # Código fuente principal
├── scripts/               # Scripts de utilidad (incluye cambio de bundle ID)
├── __tests__/             # Tests de la aplicación
├── .vscode/               # Configuración de VS Code
└── ...                    # Archivos de configuración del proyecto
```

## 🚀 Instrucciones de inicio

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/ehernandezlabelgrup/rn-template.git
   cd rn-template
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Personalizar el Bundle ID del proyecto**:
   ```bash
   npm run combo
   ```
   Este comando iniciará un asistente que te pedirá el nombre del proyecto, a partir del cual se generará el Bundle ID (com.nombreproyecto).

4. **Iniciar el proyecto**:
   
   Para Android:
   ```bash
   npm run android
   ```
   
   Para iOS:
   ```bash
   cd ios
   pod install
   cd ..
   npm run ios
   ```

## 🔧 Scripts disponibles

- `npm run android`: Inicia la aplicación en Android
- `npm run ios`: Inicia la aplicación en iOS
- `npm start`: Inicia el servidor de Metro
- `npm run lint`: Ejecuta el linter
- `npm test`: Ejecuta las pruebas
- `npm run change-id`: Cambia solo el Bundle ID
- `npm run combo`: Cambia el Bundle ID y limpia el proyecto

## ⚠️ Requisitos

- Node.js >= 18
- React Native CLI
- Android Studio (para desarrollo en Android)
- Xcode (para desarrollo en iOS)
- CocoaPods (para iOS)

## 📝 Notas adicionales

Este template está preparado para ser personalizado según las necesidades específicas de tu proyecto. La estructura de carpetas y las librerías incluidas son recomendaciones que pueden adaptarse según los requerimientos.