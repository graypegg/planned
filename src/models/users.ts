import {useEffect, useState} from "react";
import {Fetcher} from "./fetcher";
import {UsersFetcher} from "./usersFetcher";
import {CompositeUsersFetcher} from "./compositeUsersFetcher";
import {MalformedUsersFetcher} from "./malformedUsersFetcher";

export interface User {
  age: number;
  country: string;
  email: string;
  name: { firstName: string; lastName: string };
}

export interface UserFilters {
  age: {
    min: number,
    max: number
  },
  textFilter: string
}

const kidsFetcher = new UsersFetcher('kids')
const adultsFetcher = new UsersFetcher('adults')
const seniorsFetcher = new MalformedUsersFetcher('seniors')

const compositeFetcher = new CompositeUsersFetcher([kidsFetcher, adultsFetcher, seniorsFetcher])

export function useUsers(filters: UserFilters) {
  const [isLoading, setIsLoading] = useState(true)
  const [users, setUsers] = useState<User[]>([])
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    setIsLoading(true)
    const requestTask = compositeFetcher.fetch(filters)
    requestTask.userList
      .then(setUsers)
      .catch(setError)
      .finally(() => setIsLoading(false))

    return () => requestTask.controller.abort()
  }, [filters.textFilter, filters.age.max, filters.age.min])

  return {users, isLoading, error}
}
