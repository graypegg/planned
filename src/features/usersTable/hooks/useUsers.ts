import {useCallback, useEffect, useMemo, useState} from "react";
import {UsersFetcher} from "../models/usersFetcher/usersFetcher";
import {MalformedUsersFetcher} from "../models/usersFetcher/malformedUsersFetcher";
import {CompositeUsersFetcher} from "../models/usersFetcher/compositeUsersFetcher";
import {User} from "../models/user";
import {Fetcher} from "../models/fetcher";

/**
 * Generate a new fetcher object (fetch wrapper with caching + cancelability) for this component.
 * This could be in a context if this was a real app, so we share a cache for a session.
 */
function getFetcher (): Fetcher {
  const kidsFetcher = new UsersFetcher('kids')
  const adultsFetcher = new UsersFetcher('adults')
  const seniorsFetcher = new MalformedUsersFetcher('seniors')

  return new CompositeUsersFetcher([kidsFetcher, adultsFetcher, seniorsFetcher])
}

export function useUsers() {
  const fetcher = useMemo(getFetcher, [])

  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState<User[]>([])
  const [error, setError] = useState<Error | null>(null)

  const refresh = useCallback((filters: UserFilters) => {
    setIsLoading(true)
    const fetchTask = fetcher.startFetchTask(filters)

    fetchTask.promise
      .then(setUsers)
      .then(() => setError(null))
      .catch(setError)
      .finally(() => setIsLoading(false))

    return () => fetchTask.controller.abort()
  }, [])

  return {refresh, users, isLoading, error}
}

export interface UserFilters {
  age: {
    min: number,
    max: number
  },
  textFilter: string
}
