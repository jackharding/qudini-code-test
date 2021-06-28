import md5 from 'md5';

/**
 * Action for fetching customers from the API.
 * @param {boolean} isRefetch A flag indicating whether this is a refetch
 */
export const fetchCustomers = (isRefetch) => {
	return async dispatch => {
		dispatch({ type: 'FETCH_CUSTOMERS', isRefetch });

		try {
			// TODO: Fix API call
			const customers = mockedData.map(cust => ({
				...cust,
				hashedEmail: md5(cust.email),
				expectedTime: new Date(cust.expectedTime).toLocaleString(),
			}));
			// const headers = new Headers();
			// headers.set('Authorization', 'Basic Y29kZXRlc3QxOmNvZGV0ZXN0MTAw');;
			// fetch('https://app.qudini.com/api/queue/gj9fs', {
			//     method: 'GET',
			//     headers,
			// }).then(response => response.json())
	
			dispatch({ type: 'FETCH_CUSTOMERS_SUCCESS', payload: customers })
		} catch(e) {
			dispatch({ type: 'FETCH_CUSTOMERS_FAILURE', error: e.message })
		}
	}
}

const mockedData = [
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
	{
			id: '5419836b-1181-4a61-9fa1-7ad142c48e93',
			name: 'Rachel Rachelson',
			expectedTime: '2021-06-28T16:52:53.627Z',
			email: 'jackk.harding.95@gmail.com'
	},
	{
			id: '5419836b-1181-4a61-9fa1-7ad142c48e94',
			name: 'Keith Chegwin',
			expectedTime: '2021-06-28T16:28:53.627Z',
			email: 'jackk.harding.96@gmail.com'
	},
	{
			id: '5419836b-1181-4a61-9fa1-7ad142c48e95',
			name: 'Spud Mckenzie',
			expectedTime: '2021-06-28T16:38:53.627Z',
			email: 'jackk.harding.97@gmail.com'
	},
];