import {UserList} from "./users";
import {waitFor} from "@testing-library/dom";
import {
  allAdultsResponse,
  allKidsResponse,
  allSeniorsResponse, belle, danny, graham,
  mockFetch,
  oldAric,
  youngAric
} from "../../utils/mockFetch";
import {mock} from "node:test";

describe('UserList', () => {
  it('should start with an empty list and be loading', () => {
    const list = new UserList()
    expect(list.isLoading).toBeTruthy()
    expect(list.users).toEqual([])
  })

  it('should request all three endpoints at first', async () => {
    const mockedFetch = mockFetch()
    mockedFetch.mockImplementation((url) => {
      if (url.includes('/users/kids')) return allKidsResponse
      if (url.includes('/users/adults')) return allAdultsResponse
      if (url.includes('/users/seniors')) return allSeniorsResponse
    })

    const list = new UserList()
    await waitFor(() => expect(list.isLoading).toBeFalsy())
    expect(mockedFetch).toHaveBeenCalledTimes(3)
    expect(mockedFetch).toHaveBeenCalledWith(expect.stringContaining(`/users/kids`))
    expect(mockedFetch).toHaveBeenCalledWith(expect.stringContaining(`/users/adults`))
    expect(mockedFetch).toHaveBeenCalledWith(expect.stringContaining(`/users/seniors`))
    expect(list.users).toEqual(expect.arrayContaining([
      graham,
      youngAric,
      oldAric,
      belle,
      danny
    ]))
  })

  it('should always order users by name (a-z) first, and age (old-young) second', async () => {
    const mockedFetch = mockFetch()
    mockedFetch.mockImplementation((url) => {
      if (url.includes('/users/kids')) return allKidsResponse
      if (url.includes('/users/adults')) return allAdultsResponse
      if (url.includes('/users/seniors')) return allSeniorsResponse
    })

    const list = new UserList()
    list.refresh()
    await waitFor(() => expect(list.isLoading).toBeFalsy())
    expect(list.users).toEqual([
      oldAric,
      youngAric,
      belle,
      danny,
      graham
    ])
  })
})
