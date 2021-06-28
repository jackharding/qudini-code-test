export const initialState = {
    customers: [],
    isLoading: false,
    isRefetching: false,
    error: undefined,
};

export default (state = initialState, action) => {
    switch(action.type) {
        case 'FETCH_CUSTOMERS':
            return {
                ...state,
                isLoading: !action.isRefetching,
                isRefetching: !!action.isRefetching,
            };
        case 'FETCH_CUSTOMERS_SUCCESS':
            // TODO: Pagination?
            return {
                ...state,
                customers: action.payload,
                isLoading: false,
                isRefetching: false,
            };
        case 'FETCH_CUSTOMERS_FAILURE':
            return {
                ...state,
                error: action.error,
                isLoading: false,
                isRefetching: false,
            };
        default:
            return state;
    }
}
