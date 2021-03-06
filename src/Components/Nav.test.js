import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import Nav from './Nav'

const state = {
  movies: null,
  isLoading: false,
  error: null,
  isLoggedIn: false,
  logOutMethod: jest.fn(),
  logInMethod: jest.fn(),
  user: null,
  ratings: null
}

describe('Nav', () => {
  it('should render a title, a search, and a button', () => {
    const { getByText, getByRole, getByPlaceholderText } = render(
      <BrowserRouter>
        <Nav data={state} />
      </BrowserRouter>
    );
    const navTitle = getByText('DOPE NOPE')
    const searchInput = getByPlaceholderText('Search Movies...')
    const logInButton = getByRole('button', { name: 'LOG IN' })
    expect(navTitle).toBeInTheDocument()
    expect(searchInput).toBeInTheDocument()
    expect(logInButton).toBeInTheDocument()
  });

  it('Should bring up the log in form when clicked', async () => {
    const { getByText, getByRole } = render(
      <BrowserRouter>
        <Nav data={state} />
      </BrowserRouter>
    )
    const logInButton = getByRole('button');
    fireEvent.click(logInButton);
    const logInFormTitle = await waitFor(() => getByText('LOG IN'))
    expect(logInFormTitle).toBeInTheDocument()
    expect(state.logInMethod).toBeCalledTimes(1)
  })
})
