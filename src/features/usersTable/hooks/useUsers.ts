import {useEffect, useMemo, useState} from "react";
import {UsersFetcher} from "../models/usersFetcher/usersFetcher";
import {MalformedUsersFetcher} from "../models/usersFetcher/malformedUsersFetcher";
import {CompositeUsersFetcher} from "../models/usersFetcher/compositeUsersFetcher";
import {User} from "../models/user";

function getFetcher () {
  const kidsFetcher = new UsersFetcher('kids')
  const adultsFetcher = new UsersFetcher('adults')
  const seniorsFetcher = new MalformedUsersFetcher('seniors')

  return new CompositeUsersFetcher([kidsFetcher, adultsFetcher, seniorsFetcher])
}

export function useUsers(filters: UserFilters) {
  const fetcher = useMemo(getFetcher, [])

  const [isLoading, setIsLoading] = useState(true)
  const [users, setUsers] = useState<User[]>([])
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    setIsLoading(true)
    const fetchTask = fetcher.startFetchTask(filters)

    fetchTask.promise
      .then(setUsers)
      .catch(setError)
      .finally(() => setIsLoading(false))

    return () => fetchTask.controller.abort()
  }, [filters.textFilter, filters.age.max, filters.age.min])

  return {users, isLoading, error}
}

export interface UserFilters {
  age: {
    min: number,
    max: number
  },
  textFilter: string
}
