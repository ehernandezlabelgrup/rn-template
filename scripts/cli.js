#!/usr/bin/env node
/**
 * Interfaz de línea de comandos para el script de cambio de ID
 * Con visualización mejorada usando colores y estilos
 * Y detección automática del ID de paquete
 */
const path = require('path')
const chalk = require('chalk')
const boxen = require('boxen')
const ora = require('ora')
const Table = require('cli-table3')
const { generarPackageId, detectarPackageId, crearInterfazRL } = require('./utils')
const { actualizarProyecto } = require('./project-updater')

// Configuración de estilos
const estilos = {
  titulo: chalk.bold.blue,
  subtitulo: chalk.bold.cyan,
  exito: chalk.bold.green,
  error: chalk.bold.red,
  advertencia: chalk.bold.yellow,
  info: chalk.white,
  resaltado: chalk.bold.white,
  comando: chalk.italic.greenBright
}

/**
 * Muestra un encabezado con estilo
 * @param {string} texto - Texto del encabezado
 */
function mostrarEncabezado(texto) {
  console.log(
    boxen(estilos.titulo(texto), {
      padding: 1,
      margin: { top: 1, bottom: 1 },
      borderStyle: 'round',
      borderColor: 'blue'
    })
  )
}

/**
 * Muestra un mensaje de resultado con estilo
 * @param {Object} resultado - Objeto con los resultados de la operación
 */
function mostrarResultado(resultado) {
  console.log('\n')
  
  // Crear tabla de resultados
  const tabla = new Table({
    head: [
      estilos.subtitulo('Operación'),
      estilos.subtitulo('Resultado')
    ],
    colWidths: [30, 20],
    style: { head: [], border: [] }
  })
  
  // Añadir filas a la tabla
  tabla.push(
    [
      'Build.gradle',
      resultado.gradleActualizado
        ? estilos.exito('✓ Actualizado')
        : estilos.advertencia('⚠ Sin cambios')
    ],
    [
      'Carpetas encontradas',
      resultado.carpetasEncontradas > 0
        ? estilos.exito(resultado.carpetasEncontradas)
        : estilos.advertencia('0')
    ],
    [
      'Carpetas renombradas',
      resultado.carpetasRenombradas > 0
        ? estilos.exito(resultado.carpetasRenombradas)
        : estilos.advertencia('0')
    ],
    [
      'Archivos actualizados',
      resultado.archivosActualizados > 0
        ? estilos.exito(resultado.archivosActualizados)
        : estilos.advertencia('0')
    ]
  )
  
  console.log(tabla.toString())
  console.log('\n')
  
  // Mensaje de éxito o error general
  if (
    resultado.gradleActualizado ||
    resultado.carpetasRenombradas > 0 ||
    resultado.archivosActualizados > 0
  ) {
    console.log(
      boxen(estilos.exito('¡Actualización completada con éxito!'), {
        padding: 1,
        margin: { top: 0, bottom: 1 },
        borderStyle: 'round',
        borderColor: 'green'
      })
    )
  } else {
    console.log(
      boxen(
        estilos.advertencia(
          'Operación completada, pero no se detectaron cambios.\n' +
          'Verifica que los IDs de paquete sean correctos.'
        ),
        {
          padding: 1,
          margin: { top: 0, bottom: 1 },
          borderStyle: 'round',
          borderColor: 'yellow'
        }
      )
    )
  }
}

/**
 * Muestra los próximos pasos a seguir
 */
function mostrarProximosPasos() {
  console.log(estilos.subtitulo('\n▶ Próximos pasos:'))
  console.log(
    `1. Limpiar el proyecto: ${estilos.comando('cd android && ./gradlew clean')}`
  )
  console.log(
    `2. Compilar y ejecutar: ${estilos.comando('npx react-native run-android')}`
  )
  console.log('\n')
}

/**
 * Función principal para ejecutar el script
 */
function main() {
  // Mostrar encabezado
  mostrarEncabezado('Cambio de ID de Paquete Android')

  const rl = crearInterfazRL()
  
  // Obtener la ruta del proyecto
  let rutaProyecto = './' // Ruta actual
  rutaProyecto = path.resolve(rutaProyecto)
  console.log(`${estilos.info('Ruta del proyecto:')} ${estilos.resaltado(rutaProyecto)}`)
  
  // Detectar ID actual
  const spinner = ora('Detectando ID actual del paquete...').start()
  const viejoPackageId = detectarPackageId(rutaProyecto)
  
  if (viejoPackageId) {
    spinner.succeed(`ID actual detectado: ${estilos.resaltado(viejoPackageId)}`)
  } else {
    spinner.fail('No se pudo detectar el ID actual')
    console.log(estilos.error('No se pudo detectar automáticamente el ID del paquete.'))
    rl.close()
    return
  }
  
  // Preguntar por el nuevo nombre
  rl.question(`${estilos.info('Introduce el nombre del proyecto para el nuevo ID:')} `, (nombreProyecto) => {
    try {
      const nuevoPackageId = generarPackageId(nombreProyecto)
      console.log(`\n${estilos.info('ID actual:')} ${estilos.resaltado(viejoPackageId)}`)
      console.log(`${estilos.info('Nuevo ID:')} ${estilos.resaltado(nuevoPackageId)}\n`)
      
      // Confirmar cambios
      rl.question(`${estilos.info('¿Confirmar cambios?')} ${estilos.resaltado('(s/n):')} `, (respuesta) => {
        if (respuesta.toLowerCase() === 's') {
          // Mostrar spinner mientras se actualiza
          const spinnerUpdate = ora('Actualizando proyecto...').start()
          
          // Actualizar proyecto
          const resultado = actualizarProyecto(rutaProyecto, viejoPackageId, nuevoPackageId)
          
          // Detener spinner
          spinnerUpdate.succeed('Proceso completado')
          
          // Mostrar resultados
          mostrarResultado(resultado)
          mostrarProximosPasos()
        } else {
          console.log(estilos.advertencia('\n▶ Operación cancelada.'))
        }
        rl.close()
      })
    } catch (error) {
      console.log(estilos.error(`\n▶ Error: ${error.message}`))
      rl.close()
    }
  })
}

// Ejecutar el script si es llamado directamente
if (require.main === module) {
  main()
}

module.exports = {
  main
}