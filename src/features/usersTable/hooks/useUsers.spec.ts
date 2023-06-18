import {renderHook, waitFor} from "@testing-library/react"
import {UserFilters, useUsers} from "./useUsers"
import {
  belle,
  danny,
  graham,
  oldAric,
  youngAric,
  allKidsResponse,
  allAdultsResponse,
  allSeniorsResponse,
  mockFetch,
} from "../../../../utils/mockFetch"

const defaultFilters: UserFilters = {
  age: {max: 0, min: 100},
  textFilter: ""
}

describe('useUsers hook', () => {
  let mockedFetch: ReturnType<typeof mockFetch>;

  beforeEach(() => {
    mockedFetch = mockFetch()
    mockedFetch.mockImplementation(url => {
      if (url.includes('users/kids')) {
        return Promise.resolve(allKidsResponse)
      }
      if (url.includes('users/adults')) {
        return Promise.resolve(allAdultsResponse)
      }
      if (url.includes('users/seniors')) {
        return Promise.resolve(allSeniorsResponse)
      }
    })
  })
  describe('network activity', () => {
    beforeEach(() => {
      vi.spyOn(global, 'fetch')
    })

    it('should request from 3 endpoints', () => {
      renderHook(() => useUsers(defaultFilters))
      expect(mockedFetch).toHaveBeenCalledTimes(3)
    })

    it('should cache results and not call again during the next rerender', async () => {
      const hook = renderHook(() => useUsers(defaultFilters))
      hook.rerender()
      await waitFor(() => expect(hook.result.current.isLoading).toBeFalsy())
      expect(mockedFetch).toHaveBeenCalledTimes(3)
    })
  })

  it('should order results by name ascending followed by age descending', async () => {
    const hook = renderHook(() => useUsers(defaultFilters))
    await waitFor(() => expect(hook.result.current.isLoading).toBeFalsy())
    expect(hook.result.current.users).toEqual([
      oldAric,
      youngAric,
      belle,
      danny,
      graham
    ])
  })
})
