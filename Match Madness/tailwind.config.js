  /** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/**/*.{html,js,ts,jsx,tsx}', // Caminho para os arquivos que vão usar o Tailwind
    ],
    theme: {
      extend: {
        spacing: {
          'grid-cell': '8rem', // Aqui você define o tamanho personalizado
        },
        // Se precisar modificar o height de um grid específico
        height: {
          'grid-cell': '8rem', // Personalizando a altura das células
        },
      },
    },
    plugins: [],
  }
  module.exports = {
    theme: {
      extend: {
        colors: {
          neonBlue: '#00f',
          neonGreen: '#0f0',
          neonPink: '#f0f',
          neonYellow: '#ff0',
        },
        boxShadow: {
          neonBlue: '0 0 10px 5px #00f',
          neonGreen: '0 0 10px 5px #0f0',
          neonPink: '0 0 10px 5px #f0f',
          neonYellow: '0 0 10px 5px #ff0',
        }
      }
    }
  }
