import reducer, { initialState } from "./reducer";

describe(`the reducer module`, () => {
    it(`should have the following initialState`, () => {
        expect(initialState).toHaveProperty('customers');
        expect(initialState.customers).toHaveLength(0);
    });

    it(`should return the initialState on the default case`, () => {
        // Given
        const action = {
            type: 'TEST'
        };

        // When
        const result = reducer(undefined, action);

        // Then
        expect(result).toEqual(initialState)
    });

    it(`should return the correct state on the FETCH_CUSTOMERS case`, () => {
        // Given
        const action = {
            type: 'FETCH_CUSTOMERS',
        };

        // When
        const result = reducer(undefined, action);

        // Then
        expect(result).toEqual({
            ...initialState,
            isLoading: true,
            error: undefined
        })
    });

    it(`should return the correct state on the FETCH_CUSTOMERS case where the isRefetching flag === true`, () => {
        // Given
        const action = {
            type: 'FETCH_CUSTOMERS',
            isRefetching: true
        };

        // When
        const result = reducer(undefined, action);

        // Then
        expect(result).toEqual({
            ...initialState,
            isRefetching: true,
            error: undefined
        })
    });

    it(`should return the correct state on the FETCH_CUSTOMERS_SUCCESS case`, () => {
        const users = [
            {
                id: '5419836b-1181-4a61-9fa1-7ad142c48e91',
                name: 'John Phillips',
                expectedTime: '2021-06-28T16:58:53.627Z',
                email: 'jackk.harding.93@gmail.com',
                hashedEmail: '666'
            },
            {
                id: '5419836b-1181-4a61-9fa1-7ad142c48e92',
                name: 'Joe Jacobs',
                expectedTime: '2021-06-28T17:02:53.627Z',
                email: 'jackk.harding.94@gmail.com',
                hashedEmail: '666'
            }
        ];

        // Given
        const action = {
            type: 'FETCH_CUSTOMERS_SUCCESS',
            payload: users,
        };

        // When
        const result = reducer(undefined, action);

        // Then
        expect(result).toEqual({
            isLoading: false,
            isRefetching: false,
            error: undefined,
            customers: users
        })
    });

    it(`should return the correct state on the FETCH_CUSTOMERS_FAILURE case`, () => {
        const error = 'Uh oh...';

        // Given
        const action = {
            type: 'FETCH_CUSTOMERS_FAILURE',
            error,
        };

        // When
        const result = reducer(undefined, action);

        // Then
        expect(result).toEqual({
            ...initialState,
            error,
            isLoading: false,
        })
    });
});
