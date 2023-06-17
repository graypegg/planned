import React from 'react';
import {render, screen} from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom'
import {Mock} from "vitest";
import {allAdultsResponse, allKidsResponse, allSeniorsResponse, mockFetch, unmockFetch} from "../../utils/mockFetch";

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
  it('should allow changing the form values', () => {
    render(
      <UsersPage></UsersPage>
    )

    const minField = screen.getByLabelText<HTMLInputElement>('Min')
    const maxField = screen.getByLabelText<HTMLInputElement>('Max')

    userEvent.type(minField, '15')
    userEvent.type(maxField, '65')

    expect(minField.value).toBe('15')
    expect(maxField.value).toBe('65')
  })

  describe('List', () => {
    let mockedFetch: Mock

    beforeEach(() => {
      mockedFetch = mockFetch()
    })

    afterEach(() => {
      unmockFetch()
    })

    it('should show a full list of users by default', () => {
      mockedFetch.mockImplementation((url) => {
        if (url.includes('/users/kids')) return allKidsResponse
        if (url.includes('/users/adults')) return allAdultsResponse
        if (url.includes('/users/seniors')) return allSeniorsResponse
      })

      render(
        <UsersPage></UsersPage>
      )

      const tableNames = screen.getAllByLabelText('Name')

      expect(tableNames.length).toBe(5)
      expect(mockedFetch).toHaveBeenCalledTimes(3)
    })
  })
})
