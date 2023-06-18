import React, {useEffect, useId, useState} from "react";
import {UserFilters} from "./hooks/useUsers";
import {Sheet} from "../layout/sheet";
import {Form} from "../layout/form/form";
import {Input} from "../layout/form/input";
import {Button} from "../layout/form/button";

interface UsersTableFiltersProps {
  filters: UserFilters,
  onChange(usersFilters: UserFilters): void
}

export function UsersTableFilters({filters, onChange}: UsersTableFiltersProps) {
  const [min, setMin] = useState(filters.age.min);
  const [max, setMax] = useState(filters.age.max);

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
    <Sheet>
      <Form onSubmit={handleRetrieveUsers} rows={[
        <Input label="Min" value={min.toString()} onChange={newValue => setMin(parseInt(newValue))} />,
        <Input label="Max" value={max.toString()} onChange={newValue => setMax(parseInt(newValue))} />,
        <Button type="submit">Retrieve Users</Button>
      ]} />
    </Sheet>
  );
}
