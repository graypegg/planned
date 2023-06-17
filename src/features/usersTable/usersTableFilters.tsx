import React, {useId} from "react";

export function UsersTableFilters() {
  const minFieldId = useId();
  const maxFieldId = useId();

  return (
    <div>
      <label htmlFor={minFieldId}>Min</label>
      <input id={minFieldId} name="minAge" defaultValue="0" type="number"/>

      <label htmlFor={maxFieldId}>Max</label>
      <input id={maxFieldId} name="maxAge" defaultValue="100" type="number"/>

      <button type="button">Retrieve Users</button>
    </div>
  );
}
