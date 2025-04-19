/**
 * Utilidades generales para el script de cambio de ID de paquete
 */
const fs = require('fs');
const path = require('path');
const readline = require('readline');

/**
 * Genera un ID de paquete válido a partir del nombre del proyecto
 * @param {string} proyectoNombre - Nombre del proyecto
 * @returns {string} ID de paquete generado (com.nombreproyecto)
 */
function generarPackageId(proyectoNombre) {
  if (!proyectoNombre || typeof proyectoNombre !== 'string') {
    throw new Error('Debes proporcionar un nombre de proyecto válido');
  }

  // Convertir a minúsculas
  let nombreNormalizado = proyectoNombre.toLowerCase();
  
  // Eliminar caracteres especiales y números
  nombreNormalizado = nombreNormalizado.replace(/[^a-z]/g, '');
  
  // Verificar que haya quedado algo después de la limpieza
  if (nombreNormalizado.length === 0) {
    throw new Error('El nombre del proyecto no puede estar vacío después de normalizar');
  }
  
  // Crear el ID en formato com.nombreproyecto
  const nuevoPackageId = `com.${nombreNormalizado}`;
  
  return nuevoPackageId;
}

/**
 * Crea una interfaz de línea de comandos para entrada/salida
 * @returns {readline.Interface} Interfaz de readline
 */
function crearInterfazRL() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
}

/**
 * Verifica si un archivo existe
 * @param {string} ruta - Ruta del archivo a verificar
 * @returns {boolean} true si existe, false si no
 */
function existeArchivo(ruta) {
  return fs.existsSync(ruta);
}

/**
 * Lee el contenido de un archivo
 * @param {string} ruta - Ruta del archivo a leer
 * @returns {string} Contenido del archivo
 */
function leerArchivo(ruta) {
  return fs.readFileSync(ruta, 'utf8');
}

/**
 * Escribe contenido en un archivo
 * @param {string} ruta - Ruta del archivo a escribir
 * @param {string} contenido - Contenido a escribir
 */
function escribirArchivo(ruta, contenido) {
  fs.writeFileSync(ruta, contenido);
}

module.exports = {
  generarPackageId,
  crearInterfazRL,
  existeArchivo,
  leerArchivo,
  escribirArchivo
};