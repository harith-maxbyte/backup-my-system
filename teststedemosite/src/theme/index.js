// @ts-nocheck
import { unstable_createMuiStrictModeTheme as createTheme } from '@mui/material/styles';
import typography from './typography';

// read more at https://material-ui.com/customization/themes
const theme = createTheme(({
 
  typography,
  zIndex: {
    appBar: 1200,
    drawer: 1100
  },
  topBar: {
    height: '56px'
  }
}));

export default theme;
