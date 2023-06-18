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

interface UsersTableViewProps {
  isLoading: boolean;
  error: Error | null;
  users: User[];
}

export function UsersTableView({isLoading, error, users}: UsersTableViewProps) {
  return (
    <Sheet>
      {!isLoading && !error && (
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
      {isLoading && (
        <strong>Loading...</strong>
      )}
      {error && (
        <strong>An error occurred</strong>
      )}
    </Sheet>
  );
}
