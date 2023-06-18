import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {theme} from "./theme";
import {UsersPage} from "./pages/users";
import {Header} from "./features/layout/header";

const StyledAppBody = styled.div`
  background: ${({theme}) => theme.background};
  min-height: 100vh;
`

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StyledAppBody className="App">
        <Header/>
        <UsersPage></UsersPage>
      </StyledAppBody>
    </ThemeProvider>
  )
}

export default App;
