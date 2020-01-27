import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import StarWarsCharacters from './StarWarsCharacters';
import { getData as mockGetData } from '../api/getData';
import "@testing-library/jest-dom"

jest.mock('../api/getData');

test('renders character list and async functions work properly', async () => {
    mockGetData.mockResolvedValueOnce(
    {results: [{
        name: "Luke Skywalker",
        url: "character test url"
    }],
    next: 'next test url',
    previous: 'previous test url',
})

    const { getByText, findByText } = render(<StarWarsCharacters />);

    // const previousButton = getByText(/previous/i);
    // fireEvent.click(previousButton)

    const nextButton = getByText(/next/i);
    fireEvent.click(nextButton)

    expect(mockGetData).toHaveBeenCalledTimes(1);

    await wait(() => expect(getByText(/luke/i)))

    // expect(findByText(/test/i).toContain())
})