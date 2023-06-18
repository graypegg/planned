import {User} from "./models/user";
import {Sheet} from "../layout/sheet";
import React from "react";
import styled from "styled-components";

const StyledTable = styled.table`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 100px;
  gap: 1rem;

  thead,
  tbody {
    display: contents;

    tr {
      display: contents;
    }
  }

  thead > tr {
    text-align: left;
  }
`

const StyledNote = styled.strong`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: ${({theme}) => theme.textLight};
  font-weight: normal;
`

interface UsersTableViewProps {
  isLoading: boolean;
  error: Error | null;
  users: User[];
}

export function UsersTableView({isLoading, error, users}: UsersTableViewProps) {
  return (
    <Sheet>
      {!isLoading && !error && users.length > 0 && (
        <StyledTable>
          <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
          </tr>
          </thead>
          <tbody>
          {
            users.map(user => (
              <tr key={user.uniqueId()}>
                <td>{user.getFullName()}</td>
                <td>{user.age}</td>
              </tr>
            ))
          }
          </tbody>
        </StyledTable>
      )}
      {!isLoading && !error && users.length === 0 && (
        <StyledNote>No users retrieved.</StyledNote>
      )}
      {isLoading && (
        <StyledNote>Loading...</StyledNote>
      )}
      {error && (
        <StyledNote>An error occurred</StyledNote>
      )}
    </Sheet>
  );
}
