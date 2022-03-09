import { ThemeProvider, StyledEngineProvider } from "@mui/material";
import React from "react";
import { Provider } from "react-redux";
import store from "../src/store/store";
import Routes from "./Routes";
import theme from "./theme";
class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return <>
      <Provider store={store}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <Routes />  
          </ThemeProvider>
        </StyledEngineProvider>
      </Provider>
    </>;
  }
}

export default React.memo(App);
