import React, {useState} from "react";
import {UsersTableFilters} from "./usersTableFilters";
import {UserFilters, useUsers} from "./hooks/useUsers";
import {UsersTableView} from "./usersTableView";

export function UsersTable() {
  const [filters, setFilters] = useState<UserFilters>({age: {max: 100, min: 0}, textFilter: ""})
  const {users, error, isLoading} = useUsers(filters)

  return (
    <>
      <aside>
        <UsersTableFilters filters={filters} onChange={setFilters}/>
      </aside>
      <UsersTableView isLoading={isLoading} error={error} users={users}/>
    </>
  );
}
