import React from 'react';
import styled from 'styled-components';

import useTypingTimeout from '../hooks/useTypingTimeout';
import Customer from './components/Customer';
import CustomerList from './components/CustomerList';
import Input from './components/Input';

const QueueScreen = ({
    error,
    isLoading,
    ...props
}) => {
    const [customerFilter, setCustomerFilter] = React.useState('');

    // Throttle input
    const { handleChange } = useTypingTimeout(val => setCustomerFilter(val));

    // Filter customers using the customerFilter
    const customers = props.customers && Array.isArray(props.customers) 
        ? props.customers.filter(cust => cust.name.includes(customerFilter)) 
        : [];

    if(isLoading) {
        return(
            <p>{copy.loading}</p>
        );
    }

    if(error) {
        return(
            <p>{copy.error}</p>
        );
    }

    return(
        <Wrapper>
            <Input 
                onChange={handleChange}
                placeholder={copy.filterLabel}
                aria-label={copy.filterLabel}
            />

            { !!(customers && customers.length) ? (
                <CustomerList>
                    { customers.map(cust => (
                        <Customer
                            key={cust.email}
                            name={cust.name}
                            hashedEmail={cust.hashedEmail}
                            expectedTime={cust.expectedTime}
                        />
                    )) }
                </CustomerList>
            ) : (
                <p>{copy.noResults}</p>
            )}
        </Wrapper>
    );
}

export const copy = {
    error: 'Something went wrong...',
    loading: 'Loading...',
    noResults: 'No results found',
    filterLabel: 'Filter by name',
}

const Wrapper = styled.div`
    ${Input} {
        margin: 0 auto 2rem;
    }
`;

export default QueueScreen;