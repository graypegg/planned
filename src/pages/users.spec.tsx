import React from 'react';
import {render, screen, waitFor, within} from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom'
import {Mock} from "vitest";
import {
  allAdultsResponse,
  allKidsResponse,
  allSeniorsResponse,
  graham,
  oldAric,
  youngAric,
  unmockFetch,
  mockFetch,
} from "../../utils/mockFetch";
import {JSONUserResponse} from "../features/usersTable/models/user";

import {UsersPage} from "./users";

function mockFetchWithDefaultResponses(mockedFetch: Mock) {
  mockedFetch.mockImplementation((url) => {
    if (url.includes('users/kids')) return Promise.resolve(allKidsResponse)
    if (url.includes('users/adults')) return Promise.resolve(allAdultsResponse)
    if (url.includes('users/seniors')) return Promise.resolve(allSeniorsResponse)
  })
}

async function waitForTableToBeOnScreen() {
  await waitFor(() => expect(screen.getByText(`Name`)).toBeVisible())
}

async function clickRetrieveUsersButton() {
  const retrieveUsersButton = screen.getByRole<HTMLButtonElement>('button', {name: 'Retrieve Users'})
  await userEvent.click(retrieveUsersButton)
}

async function waitForUserRowToBeOnScreen(user: JSONUserResponse) {
  await waitFor(() => expect(
    screen.getAllByText(
      `${user.name.firstName} ${user.name.lastName}`,
    ).find(nameCell => nameCell?.nextElementSibling?.textContent === user.age.toString())
  ).toBeVisible())
}

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
      mockFetchWithDefaultResponses(mockedFetch)
    })

    afterEach(() => {
      unmockFetch()
    })

    it('should not show a full list of users by default', async () => {
      render(
        <UsersPage></UsersPage>
      )
      await waitForTableToBeOnScreen();

      const rows = screen.getAllByRole('row')

      const expectedNumberOfHeaders = 1
      const expectedNumberOfRows = 0

      expect(rows.length).toBe(expectedNumberOfHeaders + expectedNumberOfRows)
      expect(mockedFetch).toHaveBeenCalledTimes(0)
    })

    it('should request all endpoints and update table the first time the retrieve users button is clicked', async () => {
      render(
        <UsersPage></UsersPage>
      )

      await waitForTableToBeOnScreen();
      await clickRetrieveUsersButton();
      await waitForUserRowToBeOnScreen(graham);

      const rows = screen.getAllByRole('row')
      const expectedNumberOfHeaders = 1
      const expectedNumberOfRows = 5

      await waitFor(() => expect(rows.length).toBe(expectedNumberOfHeaders + expectedNumberOfRows))
      expect(mockedFetch).toHaveBeenCalledTimes(3)
    })

    it('should order list by name (a-z) first, then age (old-young)', async () => {
      render(
        <UsersPage></UsersPage>
      )

      await waitForTableToBeOnScreen();
      await clickRetrieveUsersButton();
      await waitForUserRowToBeOnScreen(youngAric);
      await waitForUserRowToBeOnScreen(oldAric);

      const rows = screen.getAllByRole('row')
      expect(rows[1].textContent).toContain(`${youngAric.name.firstName} ${youngAric.name.lastName}`)
      expect(rows[2].textContent).toContain(`${oldAric.name.firstName} ${oldAric.name.lastName}`)
    })

    it('should not update the table or refresh the models when the form is changed', async () => {
      render(
        <UsersPage></UsersPage>
      )

      await waitForTableToBeOnScreen();
      await clickRetrieveUsersButton();
      await waitForUserRowToBeOnScreen(graham);

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

    it('should update the table but not refresh the models when the form is submitted a second time', async () => {
      render(
        <UsersPage></UsersPage>
      )

      await waitForTableToBeOnScreen();
      await clickRetrieveUsersButton();
      await waitForUserRowToBeOnScreen(graham);

      const minField = screen.getByLabelText<HTMLInputElement>('Min')
      const maxField = screen.getByLabelText<HTMLInputElement>('Max')

      await userEvent.type(minField, '99')
      await userEvent.type(maxField, '999')

      await clickRetrieveUsersButton();
      await waitForTableToBeOnScreen();

      const rows = screen.getAllByRole('row')
      const expectedNumberOfHeaders = 1
      const expectedNumberOfRows = 0

      await waitFor(() => expect(rows.length).toBe(expectedNumberOfHeaders + expectedNumberOfRows))
      expect(mockedFetch).toHaveBeenCalledTimes(3)
    })
  })
})
