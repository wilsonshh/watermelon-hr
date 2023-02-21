import React from 'react'
import { render, screen } from '@testing-library/react'
import { useQuery } from '@tanstack/react-query'
import People from './views/people/People'

jest.mock('@tanstack/react-query')

describe('People', () => {
  test('displays loading message while data is being fetched', () => {
    useQuery.mockReturnValueOnce({
      data: null,
      status: 'loading',
      error: null,
    })

    render(<People />)

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  test('displays error message when data fetch fails', () => {
    useQuery.mockReturnValueOnce({
      data: null,
      status: 'error',
      error: { message: 'Failed to fetch data' },
    })

    render(<People />)

    expect(screen.getByText('{"message":"Failed to fetch data"}')).toBeInTheDocument()
  })

  test('displays table of people when data is fetched successfully', () => {
    useQuery.mockReturnValueOnce({
      data: {
        count: 2,
        results: [
          {
            name: 'Luke Skywalker',
            height: '172',
            mass: '77',
          },
          {
            name: 'Leia Organa',
            height: '150',
            mass: '49',
          },
        ],
      },
      status: 'success',
      error: null,
    })

    render(<People />)

    expect(screen.getByText('People')).toBeInTheDocument()
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument()
    expect(screen.getByText('Leia Organa')).toBeInTheDocument()
  })
})
