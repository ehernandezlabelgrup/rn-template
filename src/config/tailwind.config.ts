const theme = {
  extend: {
    colors: {
      // Colores principales
      primary: '#1A237E',        // Indigo 900 (fuerte, profesional)
      primaryLight: '#90CAF9',   // Azul claro (hover, fondos claros)
      accent: '#00C896',         // Menta (acentos visuales, iconos activos)
      warning: '#FFB300',        // Amarillo (precios, alertas)
      error: '#D32F2F',          // Rojo (errores)
      success: '#388E3C',        // Verde (validaciones correctas)

      // Grises para fondos, textos, bordes
      gray: {
        50: '#FAFAFA',
        100: '#F5F5F5',          // Fondo tarjetas, inputs
        200: '#EEEEEE',          // Bordes inputs
        300: '#E0E0E0',          // Hover inputs
        500: '#9E9E9E',          // Textos secundarios
        700: '#424242',          // Textos principales
      },

      // Extras
      white: '#FFFFFF',
      black: '#000000',
      bg: '#FFFFFF',             // Fondo base
      label: '#424242',          // Etiquetas
      hint: '#9E9E9E',           // Descripciones, placeholders
      border: '#EEEEEE',         // Borde normal de inputs
      borderFocus: '#1A237E',    // Borde en foco
      borderError: '#D32F2F',    // Borde con error
      borderSuccess: '#388E3C',  // Borde en éxito
    },

    fontFamily: {
      black: ['Inter-Black'],
      blackItalic: ['Inter-BlackItalic'],
      bold: ['Inter-Bold'],
      boldItalic: ['Inter-BoldItalic'],
      extraBold: ['Inter-ExtraBold'],
      extraBoldItalic: ['Inter-ExtraBoldItalic'],
      extraLight: ['Inter-ExtraLight'],
      extraLightItalic: ['Inter-ExtraLightItalic'],
      italic: ['Inter-Italic'],
      light: ['Inter-Light'],
      lightItalic: ['Inter-LightItalic'],
      medium: ['Inter-Medium'],
      mediumItalic: ['Inter-MediumItalic'],
      regular: ['Inter-Regular'],
      semiBold: ['Inter-SemiBold'],
      semiBoldItalic: ['Inter-SemiBoldItalic'],
      thin: ['Inter-Thin'],
      thinItalic: ['Inter-ThinItalic'],
    },

    fontSize: {
      xs: '12px',      // Pequeños labels, descripciones
      sm: '14px',      // Botones pequeños, subtítulos
      base: '16px',    // Cuerpo de texto
      lg: '18px',      // Botones, textos destacados
      xl: '20px',      // Títulos pequeños
      '2xl': '24px',   // Títulos medianos
      '3xl': '28px',   // Cabeceras principales
      '4xl': '32px',   // Título hero screen
      '5xl': '36px',   // Muy grandes
    },
  },
}

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme,
}
