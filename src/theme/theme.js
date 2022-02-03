// 1. Import `extendTheme`
import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  colors: {
    themeLight: {
      50: '#f3f3ec',
      100: '#dadbd6',
      200: '#c1c3bd',
      300: '#a9aba3',
      400: '#919289',
      500: '#777970',
      600: '#5d5f57',
      700: '#42443e',
      800: '#272924',
      900: '#0b0f07',
    },
    themeDark: {
      50: '#e8f3fe',
      100: '#c5d8ed',
      200: '#a0bede',
      300: '#7ba4d1',
      400: '#578ac4',
      500: '#3e71aa',
      600: '#305884',
      700: '#223f5f',
      800: '#12263a',
      900: '#010e17',
    },
    themeMedium: {
      50: '#e9f3ff',
      100: '#cbd8e8',
      200: '#acbed3',
      300: '#8ca4c0',
      400: '#6c8aad',
      500: '#527093',
      600: '#3f5773',
      700: '#2c3e53',
      800: '#182534',
      900: '#020d18',
    },
  },
  styles: {
    global: (props) => ({
      'html, body': {
        fontFamily: 'body',
        color: mode('#0D1B2A', '#E0E1DD')(props),
        bg: mode('#E0E1DD', '#0D1B2A')(props),
        lineHeight: 'base',
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {},
      variants: {
        TEST: (props) => ({
          bg: props.colorMode === 'dark' ? 'themeMedium.400' : 'themeDark.400',
        }),
      },
    },
    Input: {
      baseStyle: {},
      variants: {
        //FIX THIS
        primary: (props) => ({
          bg: mode('black', 'black')(props),
          color: mode('black', 'black')(props),
        }),
      },
    },
  },
});
export default theme;
