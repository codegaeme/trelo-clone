import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors'
const APP_BAR_HEIGHT = '49px'
const BOARD_BAR_HEIGHT = '60px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`;
// const COLOR_APP_BAR = '#3a3a3aff'
// const COLOR_BOARD_BAR = '#404040ff'
// const COLOR_BOARD_CONTENT = '#4a4a4aff'

const COLOR_APP_BAR = '#328cc0ff'
const COLOR_BOARD_BAR = '#0c7dbfff'
const COLOR_BOARD_CONTENT = '#37b0f5ff'
// Create a theme instance.
const theme = createTheme({
  trello: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT,
    colorAppBar: COLOR_APP_BAR,
    colorBoardBar: COLOR_BOARD_BAR,
    colorBoardContent: COLOR_BOARD_CONTENT,
  },
  cssVariables: true,
  palette: {
    primary: {
      main: '#4567ffff',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none' // Tắt viết hoa toàn bộ
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => {
          fontSize: '0.875rem'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.main,
          fontSize: '0.875rem',

          '& .MuiOutlinedInput-notchedOutline': {

          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.main
          }
        })
      }
    }
  }
});


export default theme;