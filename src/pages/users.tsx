import React from "react";
import {UsersTable} from "../features/usersTable/usersTable";
import {Header} from "../features/layout/header";

export function UsersPage() {

  return (
    <>
      <Header/>
      <UsersTable/>
    </>
  );
}
