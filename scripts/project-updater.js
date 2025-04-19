/**
 * Módulo principal para actualizar todo el proyecto
 * Con mensajes a color
 */
const chalk = require('chalk')
const { actualizarBuildGradle } = require('./gradle-updater')
const { actualizarEstructuraJavaKotlin } = require('./java-kotlin-updater')

// Estilos de colores
const log = {
  info: (mensaje) => console.log(chalk.blue(mensaje)),
  exito: (mensaje) => console.log(chalk.green(mensaje)),
  advertencia: (mensaje) => console.log(chalk.yellow(mensaje)),
  error: (mensaje) => console.log(chalk.red(mensaje)),
  titulo: (mensaje) => console.log(chalk.bold.cyan(`\n=== ${mensaje} ===\n`))
}

/**
 * Actualiza todo el proyecto con el nuevo ID
 * @param {string} rutaProyecto - Ruta base del proyecto
 * @param {string} viejoPackageId - ID de paquete actual
 * @param {string} nuevoPackageId - Nuevo ID de paquete
 * @returns {Object} Resultado de la operación
 */
function actualizarProyecto(rutaProyecto, viejoPackageId, nuevoPackageId) {
  log.titulo(`Actualizando proyecto de ${chalk.bold(viejoPackageId)} a ${chalk.bold(nuevoPackageId)}`)
  
  // Actualizar build.gradle
  const gradleActualizado = actualizarBuildGradle(rutaProyecto, viejoPackageId, nuevoPackageId)
  
  // Actualizar estructura Java/Kotlin
  const resultadoJavaKotlin = actualizarEstructuraJavaKotlin(rutaProyecto, viejoPackageId, nuevoPackageId)
  
  return {
    gradleActualizado,
    ...resultadoJavaKotlin
  }
}

module.exports = {
  actualizarProyecto
}