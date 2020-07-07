import Typography from 'typography'

const typography = new Typography({
  baseFontSize: '18px',
  baseLineHeight: 1.666,
  headerFontFamily: ['Roboto Mono', 'serif'],
  googleFonts: [
    {
      name: 'Montserrat',
      styles: ['400']
    },
    {
      name: 'Roboto Mono',
      styles: ['700']
    },
    {
      name: 'Space Mono',
      styles: ['400', '700']
    }
  ],
  bodyFontFamily: ['Space Mono', 'serif']
})

export default typography
