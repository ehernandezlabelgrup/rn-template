/**
 * Módulo para actualizar archivos de configuración de Gradle
 * Con mensajes a color
 */
const path = require('path')
const chalk = require('chalk')
const { existeArchivo, leerArchivo, escribirArchivo } = require('./utils')

// Estilos de colores
const log = {
  info: (mensaje) => console.log(chalk.blue(mensaje)),
  exito: (mensaje) => console.log(chalk.green(`✓ ${mensaje}`)),
  advertencia: (mensaje) => console.log(chalk.yellow(`⚠ ${mensaje}`)),
  error: (mensaje) => console.log(chalk.red(`✗ ${mensaje}`))
}

/**
 * Actualiza el archivo build.gradle con el nuevo ID
 * @param {string} rutaProyecto - Ruta base del proyecto
 * @param {string} viejoPackageId - ID de paquete actual
 * @param {string} nuevoPackageId - Nuevo ID de paquete
 * @returns {boolean} true si se actualizó correctamente, false si hubo error
 */
function actualizarBuildGradle(rutaProyecto, viejoPackageId, nuevoPackageId) {
  log.info('Actualizando build.gradle...')
  
  const buildGradlePath = path.join(rutaProyecto, 'android', 'app', 'build.gradle')
  
  if (!existeArchivo(buildGradlePath)) {
    log.error(`No se encontró el archivo ${buildGradlePath}`)
    return false
  }
  
  let contenido = leerArchivo(buildGradlePath)
  
  // Actualizar applicationId y namespace
  let contenidoActualizado = contenido.replace(
    /applicationId ["']([^"']*)["']/g, 
    `applicationId "${nuevoPackageId}"`
  )
  
  contenidoActualizado = contenidoActualizado.replace(
    /namespace ["']([^"']*)["']/g, 
    `namespace "${nuevoPackageId}"`
  )
  
  // Verificar si hubo cambios
  if (contenido === contenidoActualizado) {
    log.advertencia('No se encontraron patrones para reemplazar en build.gradle')
    return false
  }
  
  escribirArchivo(buildGradlePath, contenidoActualizado)
  log.exito(`Actualizado: ${path.basename(buildGradlePath)}`)
  return true
}

module.exports = {
  actualizarBuildGradle
}