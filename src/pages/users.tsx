import React, {useId} from "react";
import {useUsers} from "../hooks/useUsers";

export function UsersPage() {
  const minFieldId = useId();
  const maxFieldId = useId();
  const {users, error, isLoading} = useUsers({age: {max: 0, min: 0}, textFilter: ""})

  return (<>
      <h1>Planned Test</h1>
      <div>
        <button type="button">Retrieve Users</button>
      </div>
      <div>
        <h2>Users</h2>
        <label htmlFor={minFieldId}>Min</label>
        <input id={minFieldId} name="minAge" defaultValue="0" type="number"/>

        <label htmlFor={maxFieldId}>Max</label>
        <input id={maxFieldId} name="maxAge" defaultValue="100" type="number"/>
        <button type="button">Filter by age</button>
      </div>

      {
        users.map(user => (
          <div>{user.getFullName()} - {user.age}</div>
        ))
      }
    </>
  );
}
