/**
 * Módulo principal para actualizar todo el proyecto
 */
const { actualizarBuildGradle } = require('./gradle-updater');
const { actualizarEstructuraJavaKotlin } = require('./java-kotlin-updater');

/**
 * Actualiza todo el proyecto con el nuevo ID
 * @param {string} rutaProyecto - Ruta base del proyecto
 * @param {string} viejoPackageId - ID de paquete actual
 * @param {string} nuevoPackageId - Nuevo ID de paquete
 * @returns {Object} Resultado de la operación
 */
function actualizarProyecto(rutaProyecto, viejoPackageId, nuevoPackageId) {
  console.log(`\n==== Actualizando proyecto de ${viejoPackageId} a ${nuevoPackageId} ====\n`);
  
  // Actualizar build.gradle
  const gradleActualizado = actualizarBuildGradle(rutaProyecto, viejoPackageId, nuevoPackageId);
  
  // Actualizar estructura Java/Kotlin
  const resultadoJavaKotlin = actualizarEstructuraJavaKotlin(rutaProyecto, viejoPackageId, nuevoPackageId);
  
  return {
    gradleActualizado,
    ...resultadoJavaKotlin
  };
}

module.exports = {
  actualizarProyecto
};