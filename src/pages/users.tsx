import React from "react";
import {UsersTable} from "../features/usersTable/usersTable";
import {Main} from "../features/layout/main";

export function UsersPage() {
  return (
    <Main heading={
      <h2>Users</h2>
    }>
      <UsersTable/>
    </Main>
  );
}
