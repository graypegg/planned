import React from 'react';
import {render, screen, waitFor} from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom'
import {Mock} from "vitest";
import {
  allAdultsResponse,
  allKidsResponse,
  allSeniorsResponse, graham,
  mockFetch,
  oldAric,
  unmockFetch,
  youngAric
} from "../../utils/mockFetch";

import {UsersPage} from "./users";

describe('Users Page', () => {
  it('should display a form with age field set to respective defaults', () => {
    render(
      <UsersPage></UsersPage>
    )

    const minField = screen.getByLabelText<HTMLInputElement>('Min')
    const maxField = screen.getByLabelText<HTMLInputElement>('Max')

    expect(minField.value).toBe('0')
    expect(maxField.value).toBe('100')
  })
  it('should allow changing the form values', async () => {
    render(
      <UsersPage></UsersPage>
    )

    const minField = screen.getByLabelText<HTMLInputElement>('Min')
    const maxField = screen.getByLabelText<HTMLInputElement>('Max')

    await userEvent.type(minField, '3')
    await userEvent.type(maxField, '5')

    expect(minField.value).toBe('3')
    expect(maxField.value).toBe('1005')
  })

  describe('List', () => {
    let mockedFetch: Mock

    beforeEach(() => {
      mockedFetch = mockFetch()
    })

    afterEach(() => {
      unmockFetch()
    })

    it('should show a full list of users by default', async () => {
      mockedFetch.mockImplementation((url) => {
        if (url.includes('users/kids')) { return Promise.resolve(allKidsResponse) }
        if (url.includes('users/adults')) { return Promise.resolve(allAdultsResponse) }
        if (url.includes('users/seniors')) { return Promise.resolve(allSeniorsResponse) }
      })

      render(
        <UsersPage></UsersPage>
      )

      await waitFor(() => expect(screen.getByText(`${graham.name.firstName} ${graham.name.lastName}`)).toBeVisible())

      const rows = screen.getAllByRole('row')

      const expectedNumberOfHeaders = 1
      const expectedNumberOfRows = 5

      expect(rows.length).toBe(expectedNumberOfHeaders + expectedNumberOfRows)
      expect(mockedFetch).toHaveBeenCalledTimes(3)
    })

    it('should order list by name (a-z) first, then age (old-young)', async () => {
      mockedFetch.mockImplementation((url) => {
        if (url.includes('users/kids')) { return Promise.resolve(allKidsResponse) }
        if (url.includes('users/adults')) { return Promise.resolve(allAdultsResponse) }
        if (url.includes('users/seniors')) { return Promise.resolve(allSeniorsResponse) }
      })

      render(
        <UsersPage></UsersPage>
      )

      await waitFor(() => expect(screen.getByText(`${graham.name.firstName} ${graham.name.lastName}`)).toBeVisible())

      const rows = screen.getAllByRole('row')
      expect(rows[1].textContent).toContain(`${youngAric.name.firstName} ${youngAric.name.lastName}`)
      expect(rows[2].textContent).toContain(`${oldAric.name.firstName} ${oldAric.name.lastName}`)
    })

    it('should not update the table or refresh the models when the form is changed', async () => {
      mockedFetch.mockImplementation((url) => {
        if (url.includes('users/kids')) { return Promise.resolve(allKidsResponse) }
        if (url.includes('users/adults')) { return Promise.resolve(allAdultsResponse) }
        if (url.includes('users/seniors')) { return Promise.resolve(allSeniorsResponse) }
      })

      render(
        <UsersPage></UsersPage>
      )

      await waitFor(() => expect(screen.getByText(`${graham.name.firstName} ${graham.name.lastName}`)).toBeVisible())

      const minField = screen.getByLabelText<HTMLInputElement>('Min')
      const maxField = screen.getByLabelText<HTMLInputElement>('Max')
      await userEvent.type(minField, '99')
      await userEvent.type(maxField, '999')

      const rowsAfterChange = screen.getAllByRole('row')
      const expectedNumberOfHeaders = 1
      const expectedNumberOfRows = 5

      expect(mockedFetch).toHaveBeenCalledTimes(3)
      expect(rowsAfterChange.length).toBe(expectedNumberOfHeaders + expectedNumberOfRows)
    })

    it('should update the table but not refresh the models when the form is submitted', async () => {
      mockedFetch.mockImplementation((url) => {
        if (url.includes('users/kids')) { return Promise.resolve(allKidsResponse) }
        if (url.includes('users/adults')) { return Promise.resolve(allAdultsResponse) }
        if (url.includes('users/seniors')) { return Promise.resolve(allSeniorsResponse) }
      })

      render(
        <UsersPage></UsersPage>
      )

      await waitFor(() => expect(screen.getByText(`${graham.name.firstName} ${graham.name.lastName}`)).toBeVisible())

      const minField = screen.getByLabelText<HTMLInputElement>('Min')
      const maxField = screen.getByLabelText<HTMLInputElement>('Max')
      const retrieveUsersButton = screen.getByRole<HTMLButtonElement>('button', {name: 'Retrieve Users'})

      await userEvent.type(minField, '99')
      await userEvent.type(maxField, '999')
      await userEvent.click(retrieveUsersButton)

      const rows = screen.getAllByRole('row')
      const expectedNumberOfHeaders = 1
      const expectedNumberOfRows = 0

      await waitFor(() => expect(rows.length).toBe(expectedNumberOfHeaders + expectedNumberOfRows))
      expect(mockedFetch).toHaveBeenCalledTimes(3)
    })
  })
})
