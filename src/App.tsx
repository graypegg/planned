import React from 'react';
import styled from 'styled-components';
import {useUsers} from "./models/users";

const API_URL = 'http://localhost:8099'

function App() {
  const {users, error, isLoading} = useUsers({age: {max: 0, min: 0}, textFilter: ""})
  return (
    <div className="App">
      <h1>Planned Test</h1>
      <div>
        <button type="button">Retrieve Users</button>
      </div>
      <div>
        <h2>Users</h2>
        min: <input name="minAge" defaultValue="0" type="number" />
        max: <input name="maxAge" defaultValue="100" type="number" />
        <button type="button">Filter by age</button>
      </div>
    </div>
  );
}

export default App;
