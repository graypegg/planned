import React from 'react';
import styled from 'styled-components';
import {useUsers} from "./hooks/useUsers";
import {UsersPage} from "./pages/users";

const API_URL = 'http://localhost:8099'

function App() {
  return (
    <div className="App">
      <UsersPage></UsersPage>
    </div>
  )
}

export default App;
