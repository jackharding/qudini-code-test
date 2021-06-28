import React from 'react'
import { render, fireEvent, waitFor, screen, getByText } from '@testing-library/react'
// import '@testing-library/jest-dom/extend-expect';

import { QueueScreenContainer } from './QueueScreenContainer';
import { copy } from './QueueScreen';

const customers = [
	{
			id: '5419836b-1181-4a61-9fa1-7ad142c48e91',
			name: 'John Phillips',
			expectedTime: '2021-06-28T16:58:53.627Z',
			email: 'jackk.harding.93@gmail.com'
	},
	{
			id: '5419836b-1181-4a61-9fa1-7ad142c48e92',
			name: 'Joe Jacobs',
			expectedTime: '2021-06-28T17:02:53.627Z',
			email: 'jackk.harding.94@gmail.com'
	},
];

test('Customers are fetched immediately and at a given interval', async () => {
	const mockedFetchCustomers = jest.fn();
	
  render(<QueueScreenContainer fetchCustomersInterval={100} fetchCustomers={mockedFetchCustomers} />)

  expect(mockedFetchCustomers).toHaveBeenCalledTimes(1);
	await waitFor(() => expect(mockedFetchCustomers).toHaveBeenCalledTimes(2));
})

test('Loading UI renders when isLoading is true', async () => {
	const mockedFetchCustomers = jest.fn();
	
  const {getByText} = render(<QueueScreenContainer isLoading customers={customers} fetchCustomers={mockedFetchCustomers} />)

  expect(getByText(copy.loading)).toBeTruthy();
})

test('Error UI renders when error is truthy', async () => {
	const mockedFetchCustomers = jest.fn();
	
  const {getByText} = render(<QueueScreenContainer error="oh no" customers={customers} fetchCustomers={mockedFetchCustomers} />)

  expect(getByText(copy.error)).toBeTruthy();
})

describe('Customer data is present', () => {
	test('Customer cards are rendered', async () => {
		const mockedFetchCustomers = jest.fn();
		
		const {queryAllByTestId} = render(<QueueScreenContainer customers={customers} fetchCustomers={mockedFetchCustomers} />)
	
		expect(queryAllByTestId('customer-card')).toHaveLength(customers.length);
	})
	
	test('Customer cards are filtered by user input', async () => {
		const mockedFetchCustomers = jest.fn();
		
		const { getByPlaceholderText, queryAllByTestId, getByText } = render(<QueueScreenContainer customers={customers} fetchCustomers={mockedFetchCustomers} />)

		expect(queryAllByTestId('customer-card')).toHaveLength(customers.length);

		// Change filter to something with no results
		fireEvent.change(getByPlaceholderText(copy.filterLabel), { target: { value: 'Derp' } });
	
		// There should be no cards
		await waitFor(() => expect(queryAllByTestId('customer-card')).toHaveLength(0));
		expect(getByText(copy.noResults)).toBeTruthy();
		
		// Change filter to partial match of first customer
		fireEvent.change(getByPlaceholderText(copy.filterLabel), { target: { value: customers[0].name.slice(0, 5) } });

		// 1 card should show
		await waitFor(() => expect(queryAllByTestId('customer-card')).toHaveLength(1));
		
		// Clear the filter
		fireEvent.change(getByPlaceholderText(copy.filterLabel), { target: { value: '' } });

		// All cards should show
		await waitFor(() => expect(queryAllByTestId('customer-card')).toHaveLength(customers.length));
	})
});