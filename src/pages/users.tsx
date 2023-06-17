import React from "react";
import {useUsers} from "../features/usersTable/hooks/useUsers";
import {UsersTableFilters} from "../features/usersTable/usersTableFilters";
import {UsersTable} from "../features/usersTable/usersTable";
import {Header} from "../features/layout/header";

export function UsersPage() {
  const {users, error, isLoading} = useUsers({age: {max: 0, min: 0}, textFilter: ""})

  return (
    <>
      <Header/>
      <UsersTableFilters/>
      <UsersTable users={users}/>
    </>
  );
}
