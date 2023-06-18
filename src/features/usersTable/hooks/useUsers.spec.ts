import {act, renderHook, RenderHookResult, waitFor} from "@testing-library/react"
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
  age: {max: 100, min: 0},
  textFilter: ""
}

async function waitForHookToStopLoading(hook: RenderHookResult<ReturnType<typeof useUsers>, Parameters<typeof useUsers>>) {
  await waitFor(() => expect(hook.result.current.isLoading).toBeFalsy())
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

    it('should request from 3 endpoints', async () => {
      const hook = renderHook(() => useUsers())
      await act(() => hook.result.current.refresh(defaultFilters))
      await waitForHookToStopLoading(hook);

      expect(mockedFetch).toHaveBeenCalledTimes(3)
    })

    it('should cache results and not call again during the next rerender', async () => {
      const hook = renderHook(() => useUsers())
      await act(() => hook.result.current.refresh(defaultFilters))
      await waitForHookToStopLoading(hook);

      await act(() => hook.result.current.refresh({
        ...defaultFilters,
        textFilter: 'ailurus fulgens'
      }))
      await waitForHookToStopLoading(hook);

      expect(mockedFetch).toHaveBeenCalledTimes(3)
    })
  })

  it('should order results by name ascending followed by age descending', async () => {
    const hook = renderHook(() => useUsers())
    await act(() => hook.result.current.refresh(defaultFilters))
    await waitForHookToStopLoading(hook);

    expect(hook.result.current.users).toEqual([
      oldAric,
      youngAric,
      belle,
      danny,
      graham
    ])
  })
})
