/**
 * Módulo para actualizar archivos Java/Kotlin y estructura de carpetas
 */
const fs = require('fs');
const path = require('path');
const { existeArchivo, leerArchivo, escribirArchivo } = require('./utils');

/**
 * Actualiza el contenido de un archivo Kotlin/Java
 * @param {string} rutaArchivo - Ruta del archivo a actualizar
 * @param {string} viejoPackageId - ID de paquete actual
 * @param {string} nuevoPackageId - Nuevo ID de paquete
 * @returns {boolean} true si se actualizó correctamente, false si hubo error
 */
function actualizarContenidoArchivo(rutaArchivo, viejoPackageId, nuevoPackageId) {
  if (!existeArchivo(rutaArchivo)) {
    return false;
  }
  
  let contenido = leerArchivo(rutaArchivo);
  
  // Actualizar declaración de paquete
  let contenidoActualizado = contenido.replace(
    new RegExp(`package ${viejoPackageId}`, 'g'),
    `package ${nuevoPackageId}`
  );
  
  // Actualizar imports que hacen referencia al paquete viejo
  contenidoActualizado = contenidoActualizado.replace(
    new RegExp(`import ${viejoPackageId}\\.`, 'g'),
    `import ${nuevoPackageId}.`
  );
  
  // Verificar si hubo cambios
  if (contenido === contenidoActualizado) {
    console.log(`No se encontraron patrones para reemplazar en ${path.basename(rutaArchivo)}`);
    return false;
  }
  
  escribirArchivo(rutaArchivo, contenidoActualizado);
  console.log(`✅ Actualizado contenido de: ${path.basename(rutaArchivo)}`);
  return true;
}

/**
 * Busca y actualiza archivos Kotlin/Java en una carpeta específica
 * @param {string} rutaCarpeta - Ruta de la carpeta a procesar
 * @param {string} viejoPackageId - ID de paquete actual
 * @param {string} nuevoPackageId - Nuevo ID de paquete
 * @returns {number} Número de archivos actualizados
 */
function procesarArchivosCarpeta(rutaCarpeta, viejoPackageId, nuevoPackageId) {
  if (!existeArchivo(rutaCarpeta)) {
    return 0;
  }
  
  console.log(`Procesando archivos en: ${rutaCarpeta}`);
  const archivos = fs.readdirSync(rutaCarpeta);
  let archivosActualizados = 0;
  
  archivos.forEach(archivo => {
    if (archivo.endsWith('.kt') || archivo.endsWith('.java')) {
      const rutaArchivo = path.join(rutaCarpeta, archivo);
      const actualizado = actualizarContenidoArchivo(rutaArchivo, viejoPackageId, nuevoPackageId);
      if (actualizado) {
        archivosActualizados++;
      }
    }
  });
  
  return archivosActualizados;
}

/**
 * Encuentra la carpeta del paquete en una ruta base
 * @param {string} rutaBase - Ruta base donde buscar
 * @param {string} paqueteParte - Segunda parte del paquete (ej. "habita" en "com.habita")
 * @returns {string|null} Ruta de la carpeta si se encuentra, null si no
 */
function encontrarCarpetaPaquete(rutaBase, paqueteParte) {
  if (!existeArchivo(rutaBase)) {
    return null;
  }
  
  const rutaCom = path.join(rutaBase, 'com');
  if (!existeArchivo(rutaCom)) {
    return null;
  }
  
  const rutaPaquete = path.join(rutaCom, paqueteParte);
  if (!existeArchivo(rutaPaquete)) {
    return null;
  }
  
  return rutaPaquete;
}

/**
 * Renombra la carpeta del paquete
 * @param {string} rutaCarpetaVieja - Ruta actual de la carpeta
 * @param {string} nuevoPaqueteParte - Nuevo nombre para la carpeta
 * @returns {boolean} true si se renombró correctamente, false si hubo error
 */
function renombrarCarpetaPaquete(rutaCarpetaVieja, nuevoPaqueteParte) {
  const directorioBase = path.dirname(rutaCarpetaVieja);
  const rutaCarpetaNueva = path.join(directorioBase, nuevoPaqueteParte);
  
  if (existeArchivo(rutaCarpetaNueva)) {
    console.log(`⚠️ La carpeta ${rutaCarpetaNueva} ya existe. No se renombrará por seguridad.`);
    return false;
  }
  
  try {
    fs.renameSync(rutaCarpetaVieja, rutaCarpetaNueva);
    console.log(`✅ Carpeta renombrada: ${path.basename(rutaCarpetaVieja)} -> ${nuevoPaqueteParte}`);
    return true;
  } catch (error) {
    console.error(`Error al renombrar carpeta: ${error.message}`);
    return false;
  }
}

/**
 * Actualiza los archivos Kotlin/Java y renombra las carpetas
 * @param {string} rutaProyecto - Ruta base del proyecto
 * @param {string} viejoPackageId - ID de paquete actual
 * @param {string} nuevoPackageId - Nuevo ID de paquete
 * @returns {Object} Resultado de la operación
 */
function actualizarEstructuraJavaKotlin(rutaProyecto, viejoPackageId, nuevoPackageId) {
  console.log('\nActualizando estructura Java/Kotlin...');
  
  // Extraer las partes del paquete
  const viejoPaquetePartes = viejoPackageId.split('.');
  const nuevoPaquetePartes = nuevoPackageId.split('.');
  
  const viejoPaqueteParte = viejoPaquetePartes[1]; // "habita"
  const nuevoPaqueteParte = nuevoPaquetePartes[1]; // "nuevonombre"
  
  // Definir posibles rutas base para los archivos Java/Kotlin
  const posiblesRutasBase = [
    path.join(rutaProyecto, 'android', 'app', 'src', 'main', 'java'),
    path.join(rutaProyecto, 'android', 'app', 'src', 'main', 'kotlin'),
    path.join(rutaProyecto, 'android', 'app', 'src', 'debug', 'java'),
    path.join(rutaProyecto, 'android', 'app', 'src', 'release', 'java')
  ];
  
  let resultado = {
    carpetasEncontradas: 0,
    carpetasRenombradas: 0,
    archivosActualizados: 0
  };
  
  // Buscar y procesar en cada ruta posible
  posiblesRutasBase.forEach(rutaBase => {
    const rutaPaquete = encontrarCarpetaPaquete(rutaBase, viejoPaqueteParte);
    
    if (rutaPaquete) {
      resultado.carpetasEncontradas++;
      
      // Actualizar archivos dentro de la carpeta
      const archivosActualizados = procesarArchivosCarpeta(rutaPaquete, viejoPackageId, nuevoPackageId);
      resultado.archivosActualizados += archivosActualizados;
      
      // Renombrar la carpeta
      const renombrado = renombrarCarpetaPaquete(rutaPaquete, nuevoPaqueteParte);
      if (renombrado) {
        resultado.carpetasRenombradas++;
      }
    }
  });
  
  return resultado;
}

module.exports = {
  actualizarContenidoArchivo,
  procesarArchivosCarpeta,
  encontrarCarpetaPaquete,
  renombrarCarpetaPaquete,
  actualizarEstructuraJavaKotlin
};