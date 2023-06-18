import React from 'react';
import styled from 'styled-components';
import {UsersPage} from "./pages/users";
import {Header} from "./features/layout/header";

const API_URL = 'http://localhost:8099'

const StyledAppBody = styled.div`
  background: #F4F6F8;
  min-height: 100vh;
`

function App() {
  return (
    <StyledAppBody className="App">
      <Header/>
      <UsersPage></UsersPage>
    </StyledAppBody>
  )
}

export default App;
