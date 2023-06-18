import {User} from "./models/user";
import React, {useState} from "react";
import {UsersTableFilters} from "./usersTableFilters";
import {UserFilters, useUsers} from "./hooks/useUsers";

interface UsersTableProps {
}

export function UsersTable() {
  const [filters, setFilters] = useState<UserFilters>({age: {max: 100, min: 0}, textFilter: ""})
  const {users, error, isLoading} = useUsers(filters)

  return (
    <div>
      <UsersTableFilters onChange={setFilters}/>

      {!isLoading && !error && (
        <table>
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
        </table>
      )}

      { isLoading && (
        <strong>Loading...</strong>
      )}
    </div>
  );
}
