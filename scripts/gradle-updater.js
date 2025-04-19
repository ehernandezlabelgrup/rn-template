/**
 * Módulo para actualizar archivos de configuración de Gradle
 */
const path = require('path');
const { existeArchivo, leerArchivo, escribirArchivo } = require('./utils');

/**
 * Actualiza el archivo build.gradle con el nuevo ID
 * @param {string} rutaProyecto - Ruta base del proyecto
 * @param {string} viejoPackageId - ID de paquete actual
 * @param {string} nuevoPackageId - Nuevo ID de paquete
 * @returns {boolean} true si se actualizó correctamente, false si hubo error
 */
function actualizarBuildGradle(rutaProyecto, viejoPackageId, nuevoPackageId) {
  console.log('Actualizando build.gradle...');
  
  const buildGradlePath = path.join(rutaProyecto, 'android', 'app', 'build.gradle');
  
  if (!existeArchivo(buildGradlePath)) {
    console.log(`Error: No se encontró el archivo ${buildGradlePath}`);
    return false;
  }
  
  let contenido = leerArchivo(buildGradlePath);
  
  // Actualizar applicationId y namespace
  let contenidoActualizado = contenido.replace(
    /applicationId ["']([^"']*)["']/g, 
    `applicationId "${nuevoPackageId}"`
  );
  
  contenidoActualizado = contenidoActualizado.replace(
    /namespace ["']([^"']*)["']/g, 
    `namespace "${nuevoPackageId}"`
  );
  
  // Verificar si hubo cambios
  if (contenido === contenidoActualizado) {
    console.log('No se encontraron patrones para reemplazar en build.gradle');
    return false;
  }
  
  escribirArchivo(buildGradlePath, contenidoActualizado);
  console.log(`✅ Actualizado: ${buildGradlePath}`);
  return true;
}

module.exports = {
  actualizarBuildGradle
};