import React, {useEffect, useId, useState} from "react";
import {UserFilters} from "./hooks/useUsers";

interface UsersTableFiltersProps {
  onChange(usersFilters: UserFilters): void
}

export function UsersTableFilters({onChange}: UsersTableFiltersProps) {
  const minFieldId = useId();
  const maxFieldId = useId();

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);

  function handleRetrieveUsers () {
    onChange({
      age: {
        min,
        max
      },
      textFilter: ''
    })
  }

  return (
    <div>
      <label htmlFor={minFieldId}>Min</label>
      <input
        id={minFieldId}
        name="minAge"
        value={min}
        onChange={event => setMin(parseInt(event.target.value))}
        type="number"/>

      <label htmlFor={maxFieldId}>Max</label>
      <input
        id={maxFieldId}
        name="maxAge"
        value={max}
        onChange={event => setMax(parseInt(event.target.value))}
        type="number"/>

      <button onClick={handleRetrieveUsers} type="button">Retrieve Users</button>
    </div>
  );
}
