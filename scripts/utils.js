/**
 * Utilidades generales para el script de cambio de ID de paquete
 */
const fs = require('fs')
const path = require('path')
const readline = require('readline')
const chalk = require('chalk')

/**
 * Genera un ID de paquete válido a partir del nombre del proyecto
 * @param {string} proyectoNombre - Nombre del proyecto
 * @returns {string} ID de paquete generado (com.nombreproyecto)
 */
function generarPackageId(proyectoNombre) {
  if (!proyectoNombre || typeof proyectoNombre !== 'string') {
    throw new Error('Debes proporcionar un nombre de proyecto válido')
  }

  // Convertir a minúsculas
  let nombreNormalizado = proyectoNombre.toLowerCase()
  
  // Eliminar caracteres especiales y números
  const nombreOriginal = nombreNormalizado
  nombreNormalizado = nombreNormalizado.replace(/[^a-z]/g, '')
  
  // Verificar que haya quedado algo después de la limpieza
  if (nombreNormalizado.length === 0) {
    throw new Error('El nombre del proyecto no puede estar vacío después de normalizar')
  }
  
  // Crear el ID en formato com.nombreproyecto
  const nuevoPackageId = `com.${nombreNormalizado}`
  
  // Mostrar advertencia si se eliminaron caracteres
  if (nombreOriginal !== nombreNormalizado) {
    console.log(
      chalk.yellow(`⚠ Se han eliminado caracteres no válidos del nombre: `) +
      chalk.gray(`${nombreOriginal} → ${nombreNormalizado}`)
    )
  }
  
  return nuevoPackageId
}

/**
 * Detecta el ID de paquete actual del proyecto
 * @param {string} rutaProyecto - Ruta base del proyecto
 * @returns {string|null} ID de paquete detectado o null si no se encuentra
 */
function detectarPackageId(rutaProyecto) {
  const buildGradlePath = path.join(rutaProyecto, 'android', 'app', 'build.gradle')
  
  // Verificar si existe el archivo build.gradle
  if (!fs.existsSync(buildGradlePath)) {
    console.log(chalk.red(`✗ No se encontró el archivo ${buildGradlePath}`))
    return null
  }
  
  // Leer el contenido del archivo
  const contenido = fs.readFileSync(buildGradlePath, 'utf8')
  
  // Buscar el applicationId en build.gradle
  const matchApplicationId = contenido.match(/applicationId\s*["']([^"']*)["']/)
  if (matchApplicationId && matchApplicationId[1]) {
    return matchApplicationId[1]
  }
  
  // Buscar el namespace en build.gradle como alternativa
  const matchNamespace = contenido.match(/namespace\s*["']([^"']*)["']/)
  if (matchNamespace && matchNamespace[1]) {
    return matchNamespace[1]
  }
  
  // Buscar en AndroidManifest.xml como último recurso
  const manifestPath = path.join(rutaProyecto, 'android', 'app', 'src', 'main', 'AndroidManifest.xml')
  if (fs.existsSync(manifestPath)) {
    const manifestContent = fs.readFileSync(manifestPath, 'utf8')
    const matchPackage = manifestContent.match(/package=["']([^"']*)["']/)
    
    if (matchPackage && matchPackage[1]) {
      return matchPackage[1]
    }
  }
  
  console.log(chalk.yellow('⚠ No se pudo detectar automáticamente el ID del paquete'))
  return null
}

/**
 * Crea una interfaz de línea de comandos para entrada/salida
 * @returns {readline.Interface} Interfaz de readline
 */
function crearInterfazRL() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
}

/**
 * Verifica si un archivo existe
 * @param {string} ruta - Ruta del archivo a verificar
 * @returns {boolean} true si existe, false si no
 */
function existeArchivo(ruta) {
  return fs.existsSync(ruta)
}

/**
 * Lee el contenido de un archivo
 * @param {string} ruta - Ruta del archivo a leer
 * @returns {string} Contenido del archivo
 */
function leerArchivo(ruta) {
  return fs.readFileSync(ruta, 'utf8')
}

/**
 * Escribe contenido en un archivo
 * @param {string} ruta - Ruta del archivo a escribir
 * @param {string} contenido - Contenido a escribir
 */
function escribirArchivo(ruta, contenido) {
  fs.writeFileSync(ruta, contenido)
}

module.exports = {
  generarPackageId,
  detectarPackageId,
  crearInterfazRL,
  existeArchivo,
  leerArchivo,
  escribirArchivo
}