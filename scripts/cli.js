#!/usr/bin/env node
/**
 * Interfaz de línea de comandos para el script de cambio de ID
 */
const path = require('path');
const { generarPackageId, crearInterfazRL } = require('./utils');
const { actualizarProyecto } = require('./project-updater');

/**
 * Función principal para ejecutar el script
 */
function main() {
  const rl = crearInterfazRL();
  
  // Obtener la ruta del proyecto
  let rutaProyecto = './';  // Ruta actual
  rutaProyecto = path.resolve(rutaProyecto);
  console.log(`Ruta del proyecto: ${rutaProyecto}`);
  
  // ID actual fijo
  const viejoPackageId = 'com.template';
  
  // Preguntar por el nuevo nombre
  rl.question('Introduce el nombre del proyecto para el nuevo ID: ', (nombreProyecto) => {
    try {
      const nuevoPackageId = generarPackageId(nombreProyecto);
      console.log(`\nID actual: ${viejoPackageId}`);
      console.log(`Nuevo ID: ${nuevoPackageId}\n`);
      
      // Confirmar cambios
      rl.question('¿Confirmar cambios? (s/n): ', (respuesta) => {
        if (respuesta.toLowerCase() === 's') {
          // Actualizar proyecto
          const resultado = actualizarProyecto(rutaProyecto, viejoPackageId, nuevoPackageId);
          
          console.log('\n==== Resumen ====');
          console.log(`- Build.gradle actualizado: ${resultado.gradleActualizado ? 'Sí' : 'No'}`);
          console.log(`- Carpetas encontradas: ${resultado.carpetasEncontradas}`);
          console.log(`- Carpetas renombradas: ${resultado.carpetasRenombradas}`);
          console.log(`- Archivos actualizados: ${resultado.archivosActualizados}`);
          
          console.log('\n¡Actualización completada!');
          console.log('Para limpiar el proyecto, ejecuta: cd android && ./gradlew clean');
          console.log('Para compilar y probar: npx react-native run-android');
        } else {
          console.log('Operación cancelada.');
        }
        rl.close();
      });
    } catch (error) {
      console.error(`Error: ${error.message}`);
      rl.close();
    }
  });
}

// Ejecutar el script si es llamado directamente
if (require.main === module) {
  main();
}

module.exports = {
  main
};